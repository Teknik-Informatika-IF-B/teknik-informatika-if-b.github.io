const DEFAULT_SCHEDULE = {
    "S11-IFBSORE-2324": {
        metadata: {
            identifier: "S11-IFBSORE-2324", // In case we want to make it server-based
            major: "S-1 / Teknik Informatika",
            class: "IF-B-SORE",
            start: "18-09-2023", // 18 Sept 2023
            end: "08-03-2024", // 8 Mar 2024
            semester: 1,
            academicYear: "2023/2024",
            updated: "24-11-2023"
        },
        schedule: {
            regularClasses: [
                /**
                 * @property {string} subject Subject name
                 * @property {int[]} day Day of the class (1 = Monday, 2 = Tuesday, so on)
                 * @property {string} type Class type (REGULAR, REPLACEMENT, EXAM, HOLIDAY)
                 * @property {object[]} time Hour and minute when the class starts
                 * @property {int[]} location Where the class is being held (0 = Unknown, 1 = Onsite, 2 = Online)
                 */
                {
                    subject: "Sistem Otomasi Perkantoran",
                    day: [1],
                    type: "REGULAR",
                    classroom: "A.P2/L3 - Lab 5",
                    time: [
                        {
                            start: "17:30",
                            end: "19:10",
                            tolerance: "17:45",
                        },
                        {
                            start: "19:30",
                            end: "21:00",
                            tolerance: "19:40",
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
                            tolerance: "18:00",
                        },
                        {
                            start: "19:30",
                            end: "20:50",
                            tolerance: "19:40",
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
                            tolerance: "17:45",
                        }
                    ],
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
                            tolerance: "19:35",
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
                            tolerance: "18:00",
                        },
                        {
                            start: "19:30",
                            end: "20:50",
                            tolerance: "19:40",
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
                            tolerance: "18:00",
                        },
                        {
                            start: "19:30",
                            end: "20:50",
                            tolerance: "19:40",
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
                    subject: "Maulid Nabi Muhammad SAW",
                    date: "28-09-2023",
                    type: "HOLIDAY"
                },
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
                    subject: "Pemrograman Komputer TEORI",
                    examType: "UTS",
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
                    subject: "Pemrograman Komputer PRAKTEK",
                    examType: "UTS",
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
                    examType: "UTS",
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
                    examType: "UTS",
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
                    examType: "UTS",
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
                    examType: "UTS",
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
}