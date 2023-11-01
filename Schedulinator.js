const SCHEDULE_DATA = {
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
                    start: "17:30",
                    end: "19:10"
                },
                {
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
                    start: "17:45",
                    end: "19:10"
                },
                {
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
                    start: "17:45",
                    end: "19:10"
                },
                {
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
                    start: "17:45",
                    end: "19:10"
                },
                {
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
                    start: "19:10",
                    end: "19:30"
                }
            ]
        }
    }
}

var Schedulinator = {
    date: (new Date),
    schedule: {
        today: {},
        upcoming: {},
        all: {}
    },
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
            }
        }[locationId] ?? locationId;
    },
    loadSchedule(schedule) {
        this.schedule.all = schedule;
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
    }
}