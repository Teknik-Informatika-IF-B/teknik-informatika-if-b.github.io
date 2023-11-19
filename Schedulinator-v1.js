0/**
 * Returns the week number for this date.  dowOffset is the day of week the week
 * "starts" on for your locale - it can be from 0 to 6. If dowOffset is 1 (Monday),
 * the week returned is the ISO 8601 week number.
 * @param int dowOffset
 * @return int
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

const SCHEDULE_DATA = {
    validThru: "INSERT UNIX TIMESTAMP HERE AND CHECK LATER",
    major: "Teknik Informatika",
    class: "IF-B",
    classes: {
        /**
         * @field string name Name of the class
         * @field int day Day of the class (1 = Monday, 2 = Tuesday, so on)
         * @field string time Hour and minute when the class starts
         * @field int timeTolerance Time Tolerance (in seconds) after class starts
         * @field array location Where the class is being held (0 = Unknown, 1 = Onsite, 2 = Online, 3 = Holiday)
         * @field array skipWeeks What week (in int) is a holiday for a particular class
         */
        SistemOtomasiPerkantoran: {
            name: "Sistem Otomasi Perkantoran",
            day: [1],
            classroom: "A.P2/L3 - Lab 5",
            time: [
                {
                    slot: 1,
                    start: "17:0",
                    end: "19:10"
                },
                {
                    slot: 3,
                    start: "19:30",
                    end: "21:00"
                }
            ],
            timeTolerance: 15 * 60,
            location: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            skipWeeks: [],
        },
        TeoriPemrogramanKomputer: {
            name: "Pemrograman Komputer TEORI",
            day: [2],
            classroom: "B.T3/L2",
            time: [
                {
                    slot: 1,
                    start: "17:45",
                    end: "19:10"
                },
                {
                    slot: 3,
                    start: "19:30",
                    end: "20:50"
                }
            ],
            timeTolerance: 15 * 60,
            location: [1, 2, 2, 2, 1, 1, 1, 2, 1, 1, 2, 2, 2, 1, 1, 2],
            skipWeeks: [],
        },
        PraktekPemrogramanKomputer: {
            name: "Pemrograman Komputer PRAKTEK",
            day: [3],
            classroom: "A.P2/L2 - Lab 2",
            time: [
                {
                    slot: 1,
                    start: "17:30",
                    end: "19:10"
                }
            ],
            timeTolerance: 15 * 60,
            location: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            skipWeeks: [],
        },
        PengembanganKarakter: {
            name: "Pengembangan Karakter",
            day: [3],
            classroom: "B.T3/L2",
            time: [
                {
                    slot: 3,
                    start: "19:30",
                    end: "20:50"
                }
            ],
            timeTolerance: 10 * 60,
            location: [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2],
            skipWeeks: [],
        },
        WawasanInformatika: {
            name: "Wawasan Informatika",
            day: [4],
            classroom: "B.T3/L2",
            time: [
                {
                    slot: 1,
                    start: "17:45",
                    end: "19:10"
                },
                {
                    slot: 3,
                    start: "19:30",
                    end: "20:50"
                }
            ],
            timeTolerance: 15 * 60,
            location: [1, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 0],
            skipWeeks: [3],
        },
        PemikiranDesain: {
            name: "Pemikiran Desain",
            day: [5],
            classroom: "B.T3/L2",
            time: [
                {
                    slot: 1,
                    start: "17:45",
                    end: "19:10"
                },
                {
                    slot: 3,
                    start: "19:30",
                    end: "20:50"
                }
            ],
            timeTolerance: 15 * 60,
            location: [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 2, 1, 2, 2],
            skipWeeks: [],
        },
    },
    breaks: {
        BreakTime: {
            name: "Istirahat",
            day: [1, 2, 3, 4, 5],
            time: [
                {
                    slot: 2,
                    start: "19:10",
                    end: "19:30"
                }
            ]
        }
    },
    overrides: {
        MingguTenang: {
            start: 1,
            end: 2,
            classes: [
                {
                    day: 1,
                    week: 1,
                    class: {
                        'classDetails': 'a'
                    }
                }
            ]
        },
        Exams: {
            UTS: {
                start: 1,
                end: 2
            }
        }
    }
}

var Schedulinator = {
    date: (new Date),
    data: {},
    schedule: {},
    setDateByOffset(offset) {
        this.date.setDate(this.date.getDate() + offset);
    },
    setDateByAbsolute(date) {
        this.date.setDate(date);
    },
    getLocationData(locationId) {
        return {
            0: {
                text: "TIDAK ADA DATA",
                color: "danger"
            },
            1: {
                text: "LANGSUNG",
                color: "success"
            },
            2: {
                text: "MAYA",
                color: "primary"
            },
            3: {
                text: "LIBUR",
                color: "black"
            },
            4: {
                text: "UJIAN",
                color: "danger"
            }
        }[locationId] ?? locationId;
    },
    setSchedule(schedule) {
        localStorage.setItem(`Schedulinator_schedules`, JSON.stringify(schedule));
        this.loadSchedule(schedule);
    },
    loadSchedule() {
        schedules = localStorage.getItem(`Schedulinator_schedules`);
        if (null == schedules) {
            alert("Schedule not loaded. Loading default schedule.");
            this.setSchedule(SCHEDULE_DATA);
        }
        this.data = schedules;
    },
    randomId(length) {
        /**
         * Credit: https://stackoverflow.com/a/1349426
         */
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    },
    renderCardAndTimer(data) {
        let offset = (data.offset) ? `<li class="list-group-item text-danger">Offset ${data.offset} minggu</li>` : '',
            classroom = ([0, 1].includes(data.locationCode)) ? `<li class="list-group-item">Ruangan: <b>${data.classroom}</b></li>` : '',
            timerId = makeId(6);

        return {
            html:
                `<div class="col-lg-6 col-md-12">
                <div class="card shadow-sm mb-3 bg-white rounded text-center">
                    <div class="card-body">
                        <h2 style="margin-bottom: 0;" class="card-title">${data.name}</h2>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item bg-${data.location.color}"><b class="text-white">${data.location.text} (PERT. ${data.stamp.week - data.offset})</b></li>
                        ${classroom}
                        <li class="list-group-item">
                            <div class="row">
                                <div class="col">Mulai: <b>${data.time}</b></div>
                                <div class="col border-start">Selesai: <b>${data.time}</b></div>
                            </div>
                        </li>
                        <li class="list-group-item" id="timer_${timerId}">Processing...</li>
                        ${offset}
                    </ul>
                </div>
            </div>`,
            timer: timerId
        };
    },
    getRelativeDayAndWeekFromDate(date) {
        // Relative to the start of the class (18 Sept 2023)
        const startingWeek = 38;
        let currentWeek = date.getWeek();

        if (currentWeek >= startingWeek) {
            currentWeek -= startingWeek; // So we get week starting from index 0
        } else if (currentWeek < startingWeek) {
            currentWeek += 52 - startingWeek;// 52 weeks in a year
        }

        return {
            day: date.getDay(),
            week: currentWeek
        }
    },
    getClassDetailsFromDate(date) {
        let stamp = this.getRelativeDayAndWeekFromDate(date),
            classInDay = [],
            classToday = {};

        let shouldShowBreaks = false;
        classToday.forEach(c => {
            if (["LANGSUNG"].includes(c.location)) {
                shouldShowBreaks = true;
            }

        })

    },

    TEST_getRelativeDayAndWeekFromDate() {
        for (let i = 0; i < 180; i++) {
            let date = new Date;
            date.setDate(date.getDate() + i);
            stamp = this.getRelativeDayAndWeekFromDate(date);
            console.log(date, stamp);
        }
    }
}