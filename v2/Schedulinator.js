/**
 * Returns the week number for this date.  dowOffset is the day of week the week
 * "starts" on for your locale - it can be from 0 to 6. If dowOffset is 1 (Monday),
 * the week returned is the ISO 8601 week number.
 * @param {int} dowOffset
 * @return {int}
 */
Date.prototype.getWeek = function (dowOffset) {
    /*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */
    dowOffset = typeof (dowOffset) == 'number' ? dowOffset : 0; //default dowOffset to zero
    var newYear = new Date(this.getFullYear(), 0, 1);
    var day = newYear.getDay() - dowOffset; //the day of week the year begins on
    day = (day >= 0 ? day : day + 7);
    var daynum = Math.floor((this.getTime() - newYear.getTime() -
        (this.getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) / 86400000) + 1;
    var weeknum;
    //if the year starts before the middle of a week
    if (day < 4) {
        weeknum = Math.floor((daynum + day - 1) / 7) + 1;
        if (weeknum > 52) {
            nYear = new Date(this.getFullYear() + 1, 0, 1);
            nday = nYear.getDay() - dowOffset;
            nday = nday >= 0 ? nday : nday + 7;
            /*if the next year starts before the middle of
              the week, it is week #1 of that year*/
            weeknum = nday < 4 ? 1 : 53;
        }
    }
    else {
        weeknum = Math.floor((daynum + day - 1) / 7);
    }
    return weeknum;
};

/**
 * @credit https://stackoverflow.com/a/20618517
 */
function CountDownTimer(duration, granularity) {
    this.duration = duration;
    this.granularity = granularity || 1000;
    this.tickFtns = [];
    this.running = false;
}

CountDownTimer.prototype.start = function () {
    if (this.running) {
        return;
    }
    this.running = true;
    var start = Date.now(),
        that = this,
        diff, obj;

    (function timer() {
        diff = that.duration - (((Date.now() - start) / 1000) | 0);

        if (diff > 0) {
            setTimeout(timer, that.granularity);
        } else {
            diff = 0;
            that.running = false;
        }

        obj = CountDownTimer.parse(diff);
        that.tickFtns.forEach(function (ftn) {
            ftn.call(this, obj.days, obj.hours, obj.minutes, obj.seconds);
        }, that);
    }());
};

CountDownTimer.prototype.onTick = function (ftn) {
    if (typeof ftn === 'function') {
        this.tickFtns.push(ftn);
    }
    return this;
};

CountDownTimer.prototype.expired = function () {
    return !this.running;
};

CountDownTimer.parse = function (seconds) {
    return {
        'days': seconds / (60 * 60 * 24) | 0,
        'hours': (seconds % (60 * 60 * 24)) / (60 * 60) | 0,
        'minutes': (seconds % (60 * 60)) / (60) | 0,
        'seconds': (seconds % 60) | 0
    };
};


const Schedulinator = {
    data: {
        raw: {},
        cached: {}
    },
    stringToDate(date) {
        const dateParts = date.split('-');
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Month start from 0
        const year = parseInt(dateParts[2], 10);
        return new Date(year, month, day);
    },
    dateToString(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Month start from 0
        const year = date.getFullYear();
        const formattedDay = day < 10 ? '0' + day : day;
        const formattedMonth = month < 10 ? '0' + month : month;
        return `${formattedDay}-${formattedMonth}-${year}`;
    },
    translateLocationId(location) {
        return {
            1: {
                text: "LANGSUNG",
                color: "success"
            },
            2: {
                text: "MAYA",
                color: "primary"
            }
        }[location] ?? {
            text: "TIDAK ADA DATA",
            color: "danger"
        };
    },
    build() {
        if (Object.keys(this.data.raw).length < 1) {
            alert("Build failure: No raw data loaded.");
            console.log("Build failure: No raw data loaded.");
            return false;
        }

        const builtSchedule = {};
        const overrideIndex = {};
        const eventsIndex = {};
        const meetingIndex = {};
        const subjectIndex = {};
        const raw = this.data.raw;
        const startingDate = this.stringToDate(raw.metadata.start);
        const endingDate = this.stringToDate(raw.metadata.end);
        const startingWeek = startingDate.getWeek();
        let countDays = 0;

        const isValidDate = (dateStr) => !isNaN(new Date(dateStr));

        if (!isValidDate(startingDate) || !isValidDate(endingDate) || startingDate.getTime() >= endingDate.getTime()) {
            alert("Build failure: Metadata error. Start or end date is invalid.");
            console.log("Build failure: Metadata error. Start or end date is invalid.");
            return false;
        }

        // Build override index
        raw.schedules.overrides.forEach(o => {
            const dateIsObject = typeof o.date === 'object' && o.date !== null;
            const overrideKey = dateIsObject ? "ranged" : o.date;

            overrideIndex[overrideKey] = overrideIndex[overrideKey] || [];
            overrideIndex[overrideKey].push({
                start: dateIsObject ? this.stringToDate(o.date.start).getTime() : null,
                end: dateIsObject ? this.stringToDate(o.date.end).getTime() : null,
                details: o
            });
        });

        // Build events index
        raw.schedules.events.forEach(e => {
            eventsIndex[e.type] = eventsIndex[e.type] || [];
            eventsIndex[e.type].push(e);
        });

        // Create class meeting count and subject index
        raw.schedules.regularClasses.forEach(c => {
            meetingIndex[c.subject] = 0;
            subjectIndex[c.subject] = { ...c };
        });

        // Build the final schedule with each loop representing a day
        while (true) {
            const stringDate = this.dateToString(startingDate);
            const toPush = (function () {
                let classesInDay = [];
                const classesToday = [];
                let flag_hasOverrides = false;

                if (overrideIndex[stringDate]) {
                    overrideIndex[stringDate].forEach(o => {
                        classesInDay.push({ ...o.details });
                    })
                    flag_hasOverrides = true;
                } else {
                    // Specific overrides overrides ranged overrides
                    overrideIndex.ranged.forEach(o => {
                        const millis = startingDate.getTime();
                        if (millis <= o.end && millis >= o.start) {
                            classesInDay.push({ ...o.details });
                            flag_hasOverrides = true;
                        }
                    });
                }

                if (!flag_hasOverrides) {
                    const thisWeek = (startingDate.getWeek() - startingWeek + 52) % 52;
                    const thisDay = startingDate.getDay();

                    raw.schedules.regularClasses.forEach(c => {
                        if (c.day.includes(thisDay)) {
                            classesInDay.push(c);
                        }
                    });
                }

                let showBreaks = false;
                classesInDay.forEach(c => {
                    let details = { ...c };
                    if (["REGULAR", "REPLACEMENT", "EXAM"].includes(details.type)) {
                        if (["REPLACEMENT", "EXAM"].includes(details.type)) {
                            details = { ...subjectIndex[details.subject], ...details };
                        }

                        const thisLocationIndex = meetingIndex[details.subject];
                        let location = null;

                        if (typeof details.location === 'object' && details.location !== null) {
                            if (typeof details.location[thisLocationIndex] === "undefined") {
                                // Location not specified for the meeting.
                                // Assumming all meetings have been satisfied.
                                return;
                            }
                            location = details.location[thisLocationIndex];
                        } else {
                            location = details.location;
                        }

                        details.location = Schedulinator.translateLocationId(location);
                        details.meetingCount = thisLocationIndex + 1;
                        meetingIndex[details.subject]++;
                        if (location === 1) {
                            showBreaks = true;
                        }
                    }
                    classesToday.push(details);
                });

                return { classesToday, showBreaks };
            })();

            const sortedClasses = [];
            const pushToSorted = (c => {
                // Sort through the classesToday and separate out the times
                if (c.time) {
                    c.time.forEach(t => {
                        sortedClasses.push({ ...c, time: t });
                    });
                } else {
                    sortedClasses.push({ ...c });
                }
            })

            toPush.classesToday.forEach(c => pushToSorted(c));
            if (toPush.showBreaks && sortedClasses.length > 1) {
                eventsIndex["BREAK"].forEach(e => pushToSorted(e));
            }
            
            sortedClasses.sort((a, b) => {
                const timeA = a.time ? Number(a.time.start.replace(":", "")) : null;
                const timeB = b.time ? Number(b.time.start.replace(":", "")) : null;

                if (timeA && timeB) {
                    return timeA - timeB;
                } else if (timeA) {
                    return -1; // a comes before b
                } else if (timeB) {
                    return 1; // b comes before a
                } else {
                    return 0; // no time for both, maintain order
                }
            });

            if (toPush.classesToday.length > 0) {
                builtSchedule[stringDate] = sortedClasses;
            }

            if (stringDate === raw.metadata.end) {
                console.log("Reached the end of the semester. Exiting...", countDays);
                break;
            }

            if (countDays >= 365) {
                console.log("Did not stop before the year limit is up. Possible infinite loop.");
                break;
            }

            startingDate.setDate(startingDate.getDate() + 1);
            countDays++;
        }

        return builtSchedule;
    },
    getMetadata() {
        return this.data.raw.metadata;
    },
    getScheduleByDate(date = null) {
        return this.data.cached[date];
    },
    getAllSchedule() {
        return this.data.cached;
    },
    getTodaysSchedule() {
        return this.getScheduleByDate(this.dateToString(new Date));
    },
    findScheduleAfter(date, maxDays = 21) {
        date = this.stringToDate(date);
        date.setDate(date.getDate() + 1);
        let tries = 0;

        while (tries < maxDays) {
            let upcoming = this.getScheduleByDate(this.dateToString(date));
            if (upcoming) {
                return {
                    date: date,
                    schedule: upcoming,
                };
            }
            date.setDate(date.getDate() + 1);
            tries++;
        };
        return null;
    },
    setRawData(schedule) {
        return localStorage.setItem('Schedulinator_raw', JSON.stringify(schedule));
    },
    setCacheData(cached) {
        return localStorage.setItem('Schedulinator_cached', JSON.stringify(cached));
    },
    clearStoredData() {
        localStorage.removeItem('Schedulinator_raw');
        localStorage.removeItem('Schedulinator_cached');
        console.log('Schedulinator: Cleared all stored data.')
        return true;
    },
    loadData(rebuild = false) {
        raw = localStorage.getItem(`Schedulinator_raw`);
        if (null == raw) {
            console.log('Schedulinator: Nothing to load.');
            return false;
        }
        this.data.raw = JSON.parse(raw);
        console.log('Schedulinator: Raw data loaded.');

        cache = localStorage.getItem(`Schedulinator_cached`);
        if (null == cache || rebuild) {
            console.log('Schedulinator: Building cache...');
            cache = this.build();
            this.setCacheData(cache);
            cache = localStorage.getItem(`Schedulinator_cached`);
        }
        this.data.cached = JSON.parse(cache);
        console.log('Schedulinator: Cache loaded. System ready.');
    }
};