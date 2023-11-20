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

const DEFAULT_SCHEDULE = {
    metadata: {
        class: "S-1 / Teknik Informatika (IF-B)",
        start: "18-09-2023", // 18 Sept 2023
        end: "08-03-2024", // 8 Mar 2024
        code: "IF-B-SORE"
    },
    schedule: {
        regularClasses: [
            /**
             * @property {string} subject Subject name
             * @property {int[]} day Day of the class (1 = Monday, 2 = Tuesday, so on)
             * @property {string} time Hour and minute when the class starts
             * @property {int} timeTolerance Time Tolerance (in seconds) after class starts
             * @property {int[]} location Where the class is being held (0 = Unknown, 1 = Onsite, 2 = Online)
             */
            {
                subject: "Sistem Otomasi Perkantoran",
                day: [1],
                type: "REGULAR",
                classroom: "A.P2/L3 - Lab 5",
                time: [
                    {
                        start: "17:00",
                        end: "19:10",
                        tolerance: 15 * 60,
                    },
                    {
                        start: "19:30",
                        end: "21:00",
                        tolerance: 10 * 60,
                    }
                ],
                location: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            },
            {
                subject: "Pemrograman Komputer TEORI",
                day: [2],
                type: "REGULAR",
                classroom: "B.T3/L2",
                time: [
                    {
                        start: "17:45",
                        end: "19:10",
                        tolerance: 15 * 60,
                    },
                    {
                        start: "19:30",
                        end: "20:50",
                        tolerance: 10 * 60,
                    }
                ],
                location: [1, 2, 2, 2, 1, 1, 1, 2, 1, 1, 2, 2, 2, 1, 1, 2],
            },
            {
                subject: "Pemrograman Komputer PRAKTEK",
                day: [3],
                type: "REGULAR",
                classroom: "A.P2/L2 - Lab 2",
                time: [
                    {
                        start: "17:30",
                        end: "19:10",
                        tolerance: 15 * 60,
                    }
                ],
                timeTolerance: 15 * 60,
                location: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            },
            {
                subject: "Pengembangan Karakter",
                day: [3],
                type: "REGULAR",
                classroom: "B.T3/L2",
                time: [
                    {
                        start: "19:30",
                        end: "20:50",
                        tolerance: 10 * 60,
                    }
                ],
                location: [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2],
            },
            {
                subject: "Wawasan Informatika",
                day: [4],
                type: "REGULAR",
                classroom: "B.T3/L2",
                time: [
                    {
                        start: "17:45",
                        end: "19:10",
                        tolerance: 15 * 60,
                    },
                    {
                        start: "19:30",
                        end: "20:50",
                        tolerance: 10 * 60,
                    }
                ],
                location: [1, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 0],
            },
            {
                subject: "Pemikiran Desain",
                day: [5],
                type: "REGULAR",
                classroom: "B.T3/L2",
                time: [
                    {
                        start: "17:45",
                        end: "19:10",
                        tolerance: 15 * 60,
                    },
                    {
                        start: "19:30",
                        end: "20:50",
                        tolerance: 10 * 60,
                    }
                ],
                location: [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 2, 1, 2, 2],
            }
        ],
        events: [
            {
                subject: "Istirahat",
                day: [1, 2, 3, 4, 5],
                type: "BREAK",
                classroom: null,
                time: [
                    {
                        start: "19:10",
                        end: "19:30"
                    }
                ],
            }
        ],
        overrides: [
            /**
             * Types: HOLIDAY, EXAM, REPLACEMENT (Kelas Pengganti)
             */
            {
                subject: "Minggu Tenang",
                date: {
                    start: "06-11-2023",
                    end: "10-11-2023"
                },
                type: "HOLIDAY"
            },
            {
                subject: "Wawasan Informatika",
                date: "06-11-2023",
                type: "REPLACEMENT",
            },
            {
                subject: "Pemrograman Komputer",
                date: "13-11-2023",
                type: "EXAM",
                classroom: null,
                time: [
                    {
                        start: "17:30",
                        end: "19:10"
                    }
                ],
                location: 2,
            },
            {
                subject: "Pemikiran Desain",
                date: "14-11-2023",
                type: "EXAM",
                classroom: null,
                time: [
                    {
                        start: "17:45",
                        end: "19:05"
                    }
                ],
                location: 2,
            },
            {
                subject: "Pengembangan Karakter: Kepemimpinan",
                date: "15-11-2023",
                type: "EXAM",
                classroom: null,
                time: [
                    {
                        start: "17:45",
                        end: "19:05"
                    }
                ],
                location: 2,
            },
            {
                subject: "Wawasan Informatika",
                date: "16-11-2023",
                type: "EXAM",
                classroom: "B.T3/L2,B.T5/L2",
                time: [
                    {
                        start: "17:45",
                        end: "19:05"
                    }
                ],
                location: 1,
            },
            {
                subject: "Sistem Otomasi Perkantoran",
                date: "17-11-2023",
                type: "EXAM",
                classroom: "A.P3/L2 - Lab 1",
                time: [
                    {
                        start: "17:30",
                        end: "19:10"
                    }
                ],
                location: 1,
            },
            {
                subject: "Libur Tahun Baru",
                date: "01-01-2024",
                type: "HOLIDAY"
            },
            {
                subject: "Sistem Otomasi Perkantoran",
                date: "15-01-2024",
                type: "REPLACEMENT",
            },
        ]
    }
}

var Schedulinator = {
    data: {
        raw: {},
        cached: {}
    },
    stringToDate(date) {
        let dateParts = date.split('-'),
            day = parseInt(dateParts[0], 10),
            month = parseInt(dateParts[1], 10) - 1, // Month start from 0
            year = parseInt(dateParts[2], 10);
        return new Date(year, month, day);
    },
    dateToString(date) {
        let day = date.getDate(),
            month = date.getMonth() + 1, // Month start from 0
            year = date.getFullYear(),
            formattedDay = day < 10 ? '0' + day : day,
            formattedMonth = month < 10 ? '0' + month : month;
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
        raw.schedule.overrides.forEach(o => {
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
        raw.schedule.events.forEach(e => {
            eventsIndex[e.type] = eventsIndex[e.type] || [];
            eventsIndex[e.type].push(e);
        });

        // Create class meeting count and subject index
        raw.schedule.regularClasses.forEach(c => {
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
                    classesInDay = overrideIndex[stringDate];
                    flag_hasOverrides = true;
                } else {
                    overrideIndex.ranged.forEach(o => {
                        const millis = startingDate.getTime();
                        if (millis < o.end && millis >= o.start) {
                            classesInDay.push({...o.details});
                            flag_hasOverrides = true;
                        }
                    });
                }

                if (!flag_hasOverrides) {
                    const thisWeek = (startingDate.getWeek() - startingWeek + 52) % 52;
                    const thisDay = startingDate.getDay();

                    raw.schedule.regularClasses.forEach(c => {
                        if (c.day.includes(thisDay)) {
                            classesInDay.push(c);
                        }
                    });
                }

                let showBreaks = false;
                classesInDay.forEach(c => {
                    let details = { ...c };
                    if (["REGULAR", "REPLACEMENT"].includes(details.type)) {
                        if (details.type === "REPLACEMENT") {
                            details = { ...subjectIndex[details.subject], ...details };
                        }
                        const thisLocationIndex = meetingIndex[details.subject];
                        if (typeof details.location[thisLocationIndex] === "undefined") {
                            // Location not specified for the meeting.
                            // Assumming all meetings have been satisfied.
                            return;
                        }
                        const location = details.location[thisLocationIndex];
                        details.location = Schedulinator.translateLocationId(location);
                        meetingIndex[details.subject]++;
                        if (location === 1) {
                            showBreaks = true;
                        }
                    }
                    classesToday.push(details);
                });

                return { classesToday, showBreaks };
            })();

            // if (toPush.classesToday.length > 0) {
            //     builtSchedule[stringDate] = toPush.classesToday;
            // }
            // Sort through the classesToday and separate out the times

            if (stringDate === raw.metadata.end) {
                console.log("Reached the end of the semester. Exiting...", countDays);
                console.log(builtSchedule);
                break;
            }

            if (countDays >= 365) {
                console.log("Did not stop before the year limit is up. Possible infinite loop.");
                break;
            }

            startingDate.setDate(startingDate.getDate() + 1);
            countDays++;
        }
    },
    setRawSchedule(schedule) {
        localStorage.setItem(`Schedulinator_raw`, JSON.stringify(schedule));
        return schedule;
    },
    loadSchedule() {
        // TODO: REMOVE ME! ALWAYS RESET RAW SCHEDULE
        Schedulinator.setRawSchedule(DEFAULT_SCHEDULE);

        raw = localStorage.getItem(`Schedulinator_raw`);
        if (null == raw) {
            alert("DEV ONLY: No schedule set. Loading default schedule.");
            this.setRawSchedule(DEFAULT_SCHEDULE);
            raw = localStorage.getItem(`Schedulinator_raw`);
        }
        cache = localStorage.getItem(`Schedulinator_cache`);
        if (null == cache) {
            // Build new schedule
        }
        this.data.raw = JSON.parse(raw);
        this.data.cached = JSON.parse(cache);
        console.log("Schedule data loaded");
    }
};