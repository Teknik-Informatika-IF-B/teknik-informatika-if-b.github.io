const SchedulinatorEditor = {
    schedules: {
        new() { },
        open() { },
    },
    builder: {
        data: {},
        translateToNumericDay(day) {
            return {
                "senin": 1,
                "selasa": 2,
                "rabu": 3,
                "kamis": 4,
                "jumat": 5,
                "sabtu": 6,
                "minggu": 7
            }[day.toLowerCase()] || day;
        },
        handleRegularClassesFromMika() {
            // Display classes, prompt times and locations
        },
        handleRegularClassesData() {
            // Performing sanity checks and store the data
        },
        parseRegularClasses(data_from_mika, class_time_data = {}, class_location_data = {}) {
            data_from_mika = { "major": "Teknik Informatika", "majorCode": "111", "class": "IF-B", "semester": 2, "classes": [{ "hari": "Senin", "kode": "TI2134", "mata_kuliah": "Pengembangan Web Front-End", "kelas": "IF - B", "ruangan": "B.T3/L2", "pukul": "17:45 - 20:50", "sks": "4" }, { "hari": "Selasa", "kode": "TI2133", "mata_kuliah": "Pemodelan dan Implementasi Basis Data", "kelas": "IF - B", "ruangan": "B.T3/L2", "pukul": "17:45 - 20:50", "sks": "4" }, { "hari": "Rabu", "kode": "TI2111", "mata_kuliah": "Literasi Digital", "kelas": "IF - B", "ruangan": "B.T3/L2", "pukul": "17:45 - 19:05", "sks": "2" }, { "hari": "Rabu", "kode": "TI2134", "mata_kuliah": "Pengembangan Web Front-End", "kelas": "IF - B", "ruangan": "A.P1/L4 - Lab 7", "pukul": "19:20 - 21:00", "sks": "2" }, { "hari": "Kamis", "kode": "IF2103", "mata_kuliah": "Pemikiran Komputasional", "kelas": "IF - B", "ruangan": "B.T3/L2", "pukul": "17:45 - 19:05", "sks": "2" }, { "hari": "Kamis", "kode": "IF2103", "mata_kuliah": "Pemikiran Komputasional", "kelas": "IF - B", "ruangan": "A.P2/L2 - Lab 2", "pukul": "19:20 - 21:00", "sks": "2" }, { "hari": "Jumat", "kode": "IF2104", "mata_kuliah": "Matematika Komputasi", "kelas": "IF - B", "ruangan": "B.T3/L2", "pukul": "17:45 - 20:50", "sks": "4" }], "academicYear": "2023/2024" };

            const classCodeIndex = {};
            const regularClasses = [];

            // Index by code
            data_from_mika.classes.forEach(c => {
                classCodeIndex[c.kode] = classCodeIndex[c.kode] || [];
                classCodeIndex[c.kode].push(c);
            });

            Object.values(classCodeIndex).forEach(classes => {
                let havePracticals = (classes.length > 1);
                classes.forEach(c => {
                    if (havePracticals) {
                        // Some subjects have both Theory and Practicals
                        if (!c.mata_kuliah.includes('PRAKTEK') && !c.mata_kuliah.includes('TEORI')) {
                            c.mata_kuliah += (c.ruangan.includes(' Lab ')) ? ' PRAKTEK' : ' TEORI';
                        }
                    }
                    let toPush = {
                        subject: c.mata_kuliah, 
                        day: [this.translateToNumericDay(c.hari)],
                        type: "REGULAR",
                        classroom: c.ruangan,
                        time: [],
                        location: [],
                    };
                    // Will try to parse without class time data and location data
                    // Note how we use subject instead of class code because some have practicals
                    if (Object.keys(class_time_data).includes(c.mata_kuliah)) {
                        toPush['time'] = class_time_data[c.mata_kuliah];
                    }
                    if (Object.keys(class_location_data).includes(c.mata_kuliah)) {
                        toPush['location'] = class_location_data[c.mata_kuliah];
                    }
                    regularClasses.push(toPush);
                })
            });

            return regularClasses;
        },
    }
}