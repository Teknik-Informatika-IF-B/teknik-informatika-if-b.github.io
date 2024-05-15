/**
 * TODO: Place overrides in a common place for common holidays
 */
const DEFAULT_SCHEDULE = {
    "1-IFBSORE-2324": {
        metadata: {
            identifier: "1-IFBSORE-2324", // In case we want to make it server-based
            major: "S-1 / Teknik Informatika",
            class: "IF-B-SORE",
            start: "18-09-2023", // 18 Sept 2023
            end: "08-03-2024", // 8 Mar 2024
            semester: 1,
            academicYear: "2023/2024",
            updated: "17-01-2024"
        },
        schedules: {
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
                    subject: "Pengembangan Karakter: Kepemimpinan",
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
                    location: [1, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1],
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
                            tolerance: "19:35",
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
                    subject: "Libur Natal & Tahun Baru",
                    date: {
                        start: "25-12-2023",
                        end: "02-01-2024"
                    },
                    type: "HOLIDAY"
                },
                {
                    subject: "Sistem Otomasi Perkantoran",
                    date: "15-01-2024",
                    type: "REPLACEMENT",
                },
                {
                    subject: "Pengembangan Karakter: Kepemimpinan",
                    date: "03-01-2024",
                    type: "REPLACEMENT",
                },
                {
                    subject: "Pemrograman Komputer PRAKTEK",
                    date: "20-12-2023",
                    type: "REPLACEMENT",
                },
                {
                    subject: "Pengembangan Karakter: Kepemimpinan",
                    date: "17-01-2024",
                    type: "REPLACEMENT",
                    classroom: "C.T6/L3",
                },
                {
                    subject: "Pemrograman Komputer PRAKTEK",
                    date: "17-01-2024",
                    type: "REPLACEMENT",
                },
                {
                    subject: "Pemrograman Komputer TEORI",
                    date: "16-01-2024",
                    type: "REPLACEMENT",
                    classroom: "B.T2/L2",
                },
                {
                    subject: "Minggu Tenang",
                    date: {
                        start: "15-01-2024",
                        end: "20-01-2024"
                    },
                    type: "HOLIDAY"
                },
                {
                    subject: "Pemikiran Desain",
                    examType: "UAS",
                    date: "22-01-2024",
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
                    examType: "UAS",
                    date: "23-01-2024",
                    type: "EXAM",
                    classroom: "B.T3/L3,B.T5/L3",
                    time: [
                        {
                            start: "17:45",
                            end: "19:05"
                        }
                    ],
                    location: 1,
                },
                {
                    subject: "Pemrograman Komputer TEORI",
                    examType: "UAS",
                    date: "24-01-2024",
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
                    examType: "UAS",
                    date: "24-01-2024",
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
                    subject: "Sistem Otomasi Perkantoran",
                    examType: "UAS",
                    date: "25-01-2024",
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
                    subject: "Pengembangan Karakter: Kepemimpinan",
                    examType: "UAS",
                    date: "26-01-2024",
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
            ]
        }
    },
    "2-IFBSORE-2324": {
        metadata: {
            identifier: "2-IFBSORE-2324", // In case we want to make it server-based
            major: "S-1 / Teknik Informatika",
            class: "IF-B-SORE",
            start: "04-03-2024", // 4 Mar 2024
            end: "04-09-2024", // 4 Sept 2024
            semester: 2,
            academicYear: "2023/2024",
            updated: "15-05-2024"
        },
        schedules: {
            regularClasses: [
                /**
                 * @property {string} subject Subject name
                 * @property {int[]} day Day of the class (1 = Monday, 2 = Tuesday, so on)
                 * @property {string} type Class type (REGULAR, REPLACEMENT, EXAM, HOLIDAY)
                 * @property {object[]} time Hour and minute when the class starts
                 * @property {int[]} location Where the class is being held (0 = Unknown, 1 = Onsite, 2 = Online)
                 */
                {
                    subject: "Pengembangan Web Front-End TEORI",
                    day: [1],
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
                    location: [1, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
                },
                {
                    subject: "Pemodelan dan Implementasi Basis Data",
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
                    location: [1, 1, 2, 1, 2, 1, 2, 2, 1, 1, 1, 2, 2, 1, 2, 2],
                },
                {
                    subject: "Literasi Digital",
                    day: [3],
                    type: "REGULAR",
                    classroom: "B.T3/L2",
                    time: [
                        {
                            start: "17:45",
                            end: "19:05",
                            tolerance: "18:00",
                        },
                    ],
                    location: [1, 1, 2, 1, 2, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1],
                },
                {
                    subject: "Pengembangan Web Front-End PRAKTEK",
                    day: [3],
                    type: "REGULAR",
                    classroom: "A.P1/L4 - Lab 7",
                    time: [
                        {
                            start: "19:20",
                            end: "21:00",
                            tolerance: "19:30",
                        },
                    ],
                    location: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                },
                {
                    subject: "Pemikiran Komputasional TEORI",
                    day: [4],
                    type: "REGULAR",
                    classroom: "B.T3/L2",
                    time: [
                        {
                            start: "17:45",
                            end: "19:05",
                            tolerance: "18:30",
                        },
                    ],
                    location: [1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
                },
                {
                    subject: "Pemikiran Komputasional PRAKTEK",
                    day: [4],
                    type: "REGULAR",
                    classroom: "A.P2/L2 - Lab 2",
                    time: [
                        {
                            start: "19:20",
                            end: "21:00",
                            tolerance: "19:30",
                        },
                    ],
                    location: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                },
                {
                    subject: "Matematika Komputasi",
                    day: [5],
                    type: "REGULAR",
                    classroom: "B.T3/L2",
                    time: [
                        {
                            start: "17:45",
                            end: "19:05",
                            tolerance: "18:00",
                        },
                        {
                            start: "19:30",
                            end: "20:50",
                            tolerance: "19:45",
                        },
                    ],
                    location: [1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1],
                },
            ],
            events: [
                {
                    subject: "Istirahat",
                    day: [1, 2, 3, 4, 5],
                    type: "BREAK",
                    time: [
                        {
                            start: "19:05",
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
                    subject: "Hari Suci Nyepi",
                    date: "11-03-2024",
                    type: "HOLIDAY"
                },
                {
                    subject: "Wafat Isa Almasih",
                    date: "29-03-2024",
                    type: "HOLIDAY"
                },
                {
                    subject: "Hari Paskah",
                    date: "31-03-2024",
                    type: "HOLIDAY"
                },
                {
                    subject: "Hari Raya Idul Fitri",
                    date: {
                        start: "10-03-2024",
                        end: "11-03-2024"
                    },
                    type: "HOLIDAY"
                },
                {
                    subject: "Libur Bersama Idul Fitri",
                    date: {
                        start: "08-04-2024",
                        end: "15-04-2024"
                    },
                    type: "HOLIDAY"
                },
                {
                    subject: "Minggu Tenang",
                    date: {
                        start: "29-04-2024",
                        end: "03-05-2024"
                    },
                    type: "HOLIDAY"
                },
                {
                    subject: "Pengembangan Web Front-End PRAKTEK",
                    date: "03-04-2024",
                    type: "NOSHOW",
                },
                {
                    subject: "Pengembangan Web Front-End TEORI",
                    date: "29-04-2024",
                    type: "REPLACEMENT",
                },
                {
                    subject: "Pengembangan Web Front-End TEORI",
                    date: "30-04-2024",
                    type: "REPLACEMENT",
                    classroom: "C.T6/L3",
                },
                {
                    subject: "Hari Buruh",
                    date: "01-05-2024",
                    type: "HOLIDAY"
                },
                {
                    subject: "Pengembangan Web Front-End PRAKTEK",
                    date: "02-05-2024",
                    type: "REPLACEMENT",
                    classroom: "A.P1/L4",
                },
                {
                    subject: "Matematika Komputasi",
                    date: "03-05-2024",
                    type: "REPLACEMENT",
                },
                {
                    subject: "Matematika Komputasi",
                    examType: "UTS",
                    date: "06-05-2024",
                    type: "EXAM",
                    classroom: "B.T3/L2",
                    time: [
                        {
                            start: "17:45",
                            end: "19:05"
                        }
                    ],
                    location: 1,
                },
                {
                    subject: "Pemikiran Komputasional TEORI",
                    examType: "UTS",
                    date: "07-05-2024",
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
                    subject: "Pemikiran Komputasional PRAKTEK",
                    examType: "UTS",
                    date: "07-05-2024",
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
                    subject: "Pemodelan dan Implementasi Basis Data",
                    examType: "UTS",
                    date: "08-05-2024",
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
                    subject: "Pengembangan Web Front-End TEORI",
                    examType: "UTS",
                    date: "08-05-2024",
                    type: "EXAM",
                    classroom: null,
                    time: [
                        {
                            start: "19:20",
                            end: "21:00"
                        }
                    ],
                    location: 2,
                },
                {
                    subject: "Pengembangan Web Front-End PRAKTEK",
                    examType: "UTS",
                    date: "08-05-2024",
                    type: "EXAM",
                    classroom: null,
                    time: [
                        {
                            start: "19:20",
                            end: "21:00"
                        }
                    ],
                    location: 2,
                },
                {
                    subject: "Literasi Digital",
                    examType: "UTS",
                    date: "10-05-2024",
                    type: "EXAM",
                    classroom: null,
                    time: [
                        {
                            start: "19:20",
                            end: "21:00"
                        }
                    ],
                    location: 1,
                },
                {
                    subject: "Kenaikan Isa Almasih",
                    date: "09-05-2024",
                    type: "HOLIDAY"
                },
                {
                    subject: "Pemodelan dan Implementasi Basis Data",
                    date: "14-05-2024",
                    type: "NOSHOW",
                },
                {
                    subject: "Pengembangan Web Front-End PRAKTEK",
                    date: "15-05-2024",
                    type: "NOSHOW",
                },
                {
                    subject: "Hari Raya Waisak",
                    date: "23-05-2024",
                    type: "HOLIDAY"
                },
                {
                    subject: "Hari Lahir Pancasila",
                    date: "01-06-2024",
                    type: "HOLIDAY"
                },
                {
                    subject: "Hari Raya Idul Adha",
                    date: "17-06-2024",
                    type: "HOLIDAY"
                },
                {
                    subject: "Tahun Baru Islam",
                    date: "07-07-2024",
                    type: "HOLIDAY"
                },
                {
                    subject: "Hari Kemerdekaan RI",
                    date: "17-08-2024",
                    type: "HOLIDAY"
                },
            ]
        }
    }
}
