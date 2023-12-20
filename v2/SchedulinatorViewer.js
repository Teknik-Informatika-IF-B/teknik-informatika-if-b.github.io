const SchedulinatorViewer = {
    metadata: null,
    elements: {
        scheduleToday: document.getElementById('scheduleToday'),
        scheduleAll: document.getElementById('scheduleAll'),
        today: document.getElementById('todayClasses'),
        upcoming: document.getElementById('upcomingClasses'),
        metadata: document.getElementById('classMetadata')
    },
    navigation: {
        pagesElement: {
            today: document.getElementById('page_today'),
            all: document.getElementById('page_all'),
            editor: document.getElementById('page_editor')
        },
        afterNavigationCallback: {
            all: function() {
                SchedulinatorViewer.handleShowAllData();
            },
            editor: function() {
                
            }
        },
        to(page) {
            if (!Object.keys(this.pagesElement).includes(page)) {
                return false;
            }
            Object.values(this.pagesElement).forEach(e => {
                e.classList.add('d-none');
            });
            document.getElementById(`page_${page}`).classList.remove('d-none');

            if (Object.keys(this.afterNavigationCallback).includes(page)) {
                this.afterNavigationCallback[page]();
            }
        }
    },
    timer: {
        format(display) {
            return function (days, hours, minutes, seconds) {
                display.textContent = (days > 0 ? (days < 10 ? '0' + days : days) + ':' : '') +
                    (hours > 0 ? (hours < 10 ? '0' + hours : hours) + ':' : '') +
                    (minutes < 10 ? '0' + minutes : minutes) + ':' +
                    (seconds < 10 ? '0' + seconds : seconds);
                if (days + hours + minutes + seconds < 1) {
                    // For tolerance timer
                    display.textContent = 'HABIS';
                }
            }
        },
        randomId(length = 8) {
            /**
             * @credit https://stackoverflow.com/a/1349426
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
        secondsUntil(end) {
            return Math.floor((end.getTime() - (new Date).getTime()) / 1000);
        },
        getDateTimeRepresentation(date, time) {
            return new Date(`${date.toLocaleDateString('en-CA')} ${time}:00`)
        }
    },
    parseToReadableDate(date) {
        let months = ["Januari", "Febuari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        let days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        let day = days[date.getDay()];
        let month = months[date.getMonth()];
        return `${day}, ${date.getDate()} ${month} ${date.getFullYear()}`;
    },
    renderDayCard(where, details) {
        let classesHtml = '';
        let classesTimers = [];

        if (details === null) {
            classesHtml = `<div class="alert alert-info mb-0 text-center" role="alert">
                <b>Tidak ada kelas dalam waktu 3 minggu kedepan.</b>
            </div>`;
        } else {
            if (details.schedule) {
                details.schedule.forEach(e => {
                    classes = this.renderClassCard({ ...e, date: details.date });
                    classesHtml += classes.html;
                    classesTimers.push(classes.timer);
                });
            }
    
            if (!details.schedule) {
                classesHtml = `<div class="alert alert-info mb-0 text-center" role="alert">
                    <p class="mb-0"><b>Tidak ada kelas</b></p>
                </div>`;
            }
        }

        let date = (details === null) ? '¯\\_(ツ)_/¯' : this.parseToReadableDate(details.date);
        where.innerHTML += `<div class="col-md-12 col-lg-12 mb-3">
            <div class="card">
                <div class="card-header text-center bg-warning">
                    <p class="mb-0"><b>${date}</b></p>
                </div>
                <div class="card-body" style="padding: 10px;">
                    ${classesHtml}
                </div>
            </div>
        </div>`;

        classesTimers.forEach(timer => {
            if (!timer) {
                return;
            }
            
            let regularDuration = this.timer.secondsUntil(timer.stop);
            let toleranceDuration = (timer.toleranceStop) 
                ? this.timer.secondsUntil(timer.toleranceStop)
                : 0;

            if (toleranceDuration > 0 && regularDuration > 0) {
                toleranceDuration -= regularDuration;
            } else if (toleranceDuration < 0) {
                toleranceDuration = 0;
            }

            const regularTimerElement = document.getElementById(`timer_${timer.id}`);
            const toleranceTimerElement = document.getElementById(`timer_${timer.toleranceId}`);

            const regularCountdownTimer = new CountDownTimer(regularDuration, 1000);
            const toleranceCountdownTimer = new CountDownTimer(toleranceDuration, 1000);

            regularCountdownTimer.onTick(this.timer.format(regularTimerElement));
            toleranceCountdownTimer.onTick(this.timer.format(toleranceTimerElement));

            regularCountdownTimer.onTick(function() {
                if (this.expired()) {
                    regularTimerElement.parentElement.parentElement.parentElement.classList.add("bg-warning-subtle");
                    regularTimerElement.parentElement.innerHTML = `<b>KELAS DIMULAI</b>`;
                    toleranceCountdownTimer.start();
                }
            });
            toleranceCountdownTimer.onTick(function(){
                if (this.expired()) {
                    toleranceTimerElement.parentElement.parentElement.parentElement.classList.remove("bg-warning-subtle");
                    toleranceTimerElement.parentElement.parentElement.parentElement.classList.add("bg-danger-subtle");
                    toleranceTimerElement.textContent = `HABIS`;
                }
            });

            regularCountdownTimer.start();
            const parsedToleranceDuration = CountDownTimer.parse(toleranceDuration);
            this.timer.format(toleranceTimerElement)(0, 0, parsedToleranceDuration.minutes, parsedToleranceDuration.seconds);
        });
    },
    renderClassCard(details) {
        let examIndicator = '';
        if (details.type === "EXAM") {
            examIndicator = `<li class="list-group-item bg-danger"><b class="text-white" style="letter-spacing: 2px;">UJIAN — ${details.examType}</b></li>`;
        }

        let meetingTypeIndicator = '';
        let classroomAndTimeIndicator = '';
        if (["REGULAR", "REPLACEMENT", "EXAM"].includes(details.type)) {
            meetingTypeIndicator = `<li class="list-group-item bg-${details.location.color}"><b class="text-white">${details.location.text} (PERT. ${details.meetingCount})</b></li>`;
            classroomIndicator = (["LANGSUNG"].includes(details.location.text)) ? `<div class="col-6 border-end align-self-center">
                <b>${details.classroom ?? "Lihat Kartu Ujian"}</b>
            </div>` : '';
            classroomAndTimeIndicator = `<li class="list-group-item">
                <div class="row">
                    ${classroomIndicator}
                    <div class="col-${(classroomIndicator) ? '6 border-start' : '12'} align-self-center">
                        <b>${details.time.start} — ${details.time.end}</b>
                    </div>
                </div>
            </li>`;
        } else if (["BREAK"].includes(details.type)) {
            meetingTypeIndicator = `<li class="list-group-item bg-black"><b class="text-white">ISTIRAHAT</b></li>`;
            classroomAndTimeIndicator = `<li class="list-group-item"><b>${details.time.start} — ${details.time.end}</b></li>`;
        } else if (["HOLIDAY"].includes(details.type)) {
            meetingTypeIndicator = `<li class="list-group-item bg-black"><b class="text-white">LIBUR</b></li>`;
        }

        let timer = null;
        let timerIndicator = '';
        if (["REGULAR", "REPLACEMENT", "EXAM"].includes(details.type)) {
            timer = {
                id: SchedulinatorViewer.timer.randomId(),
                stop: this.timer.getDateTimeRepresentation(details.date, details.time.start),
                toleranceId: SchedulinatorViewer.timer.randomId(),
                toleranceStop: (details.time.tolerance) ? this.timer.getDateTimeRepresentation(details.date, details.time.tolerance) : false,
            };

            let toleranceText = (!details.time.tolerance) ? 'N/A' : '...'
            timerIndicator = `<li class="list-group-item">
                <div class="row">
                    <div class="col-6 border-end align-self-center">
                        Mulai: <b id="timer_${timer.id}">...</b>
                    </div>
                    <div class="col-6 border-start align-self-center">
                        Toleransi: <b id="timer_${timer.toleranceId}">${toleranceText}</b>
                    </div>
                </div>
            </li>`;
        } else if (["BREAK"].includes(details.type)) {
            timer = {
                id: SchedulinatorViewer.timer.randomId(),
                stop: this.timer.getDateTimeRepresentation(details.date, details.time.start),
                toleranceId: SchedulinatorViewer.timer.randomId(),
                toleranceStop: this.timer.getDateTimeRepresentation(details.date, details.time.end)
            };

            timerIndicator = `<li class="list-group-item">
                <div class="row">
                    <div class="col-6 border-end align-self-center">
                        Mulai: <b id="timer_${timer.id}">...</b>
                    </div>
                    <div class="col-6 border-start align-self-center">
                        Sisa: <b id="timer_${timer.toleranceId}">...</b>
                    </div>
                </div>
            </li>`;
        }

        return {
            html:
                `<div class="col-12 mb-3-notlast">
                <div class="card">
                    <ul class="list-group list-group-flush text-center">
                        ${examIndicator}
                        <li class="list-group-item bg-grey text-white"><b class="font-larger">${details.subject}</b></li>
                        ${meetingTypeIndicator}
                        ${classroomAndTimeIndicator}
                        ${timerIndicator}
                    </ul>
                </div>
            </div>`,
            timer: timer
        }
    },
    renderMetadata(data) {
        this.metadata = data;
        return `<h1 class="mb-0 font-x-large">${data.major}</h1>
        <p class="mb-0"><small>Semester ${data.semester}, ${data.class}, ${data.academicYear}</small></p>`;
    },
    runSpecificDate(date) {
        if (!this.metadata) {
            return false;
        }
        date = Schedulinator.dateToString(date);

        this.elements.today.innerHTML = '';
        this.renderDayCard(this.elements.today, {
            date: Schedulinator.stringToDate(date),
            schedule: Schedulinator.getScheduleByDate(date)
        });

        this.elements.upcoming.innerHTML = '';
        this.renderDayCard(this.elements.upcoming, Schedulinator.findScheduleAfter(date));
    },
    handleScheduleCode(form) {
        if (typeof DEFAULT_SCHEDULE === "undefined") {
            form.code.classList.add('is-invalid');
            return false;
        }
        if (!DEFAULT_SCHEDULE[form.code.value]) {
            form.code.classList.add('is-invalid');
            return false;
        }
        Schedulinator.setRawData(DEFAULT_SCHEDULE[form.code.value]);
        Schedulinator.loadData(true);
        this.run();

        form.code.classList.remove('is-invalid');
        document.getElementById('scheduleCodePrompt').classList.add('d-none');
        return false;
    },
    handleDateInput(form) {
        if (!this.metadata) {
            return false;
        }
        const futureElement = document.getElementById('tooFarFutureWarning');
        if (futureElement) {
            document.getElementById('fooFarFutureWarningDate').textContent = this.parseToReadableDate(Schedulinator.stringToDate(this.metadata.updated))
            futureElement.classList.remove('d-none');
            futureElement.classList.add('show');
        }
        document.getElementById('navbar').classList.remove('show');
        this.runSpecificDate(new Date(form.date.value));
        return false;
    },
    handleShowAllData() {
        if (!this.metadata) {
            return false;
        }

        const regularClasses = Object.values(Schedulinator.data.raw.schedules.regularClasses);
        let dataHtml = '';
        let classes = regularClasses.map((e) => {
            return {...e, location: e.location.map((l) => Schedulinator.translateLocationId(l))}
        });
        classes.forEach((e) => {
            let list = '';
            e.location.forEach((l) => {
                list += `<td class="bg-${l.color} text-white align-middle text-center"><b>${l.text}</b></td>`;
            })
            dataHtml += `<tr>
                <td><b>${e.subject}</b></td>
                ${list}
            </tr>`;
        });
        document.getElementById('scheduleAll_location').innerHTML = dataHtml;

        dataHtml = '';
        let days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        classes.forEach((e) => {
            e.time.forEach((t) => {
                dataHtml += `<tr>
                    <td>${e.subject}</td>
                    <td>${days[e.day]}</td>
                    <td>${e.classroom}</td>
                    <td>${t.start}</td>
                    <td>${t.end}</td>
                    <td>${t.tolerance}</td>
                </tr>`;
            })
        });
        document.getElementById('scheduleAll_regular').innerHTML = dataHtml;

        const metadata = Schedulinator.data.raw.metadata;
        dataHtml = '';
        for (key in metadata) {
            dataHtml += `<tr>
                <td>${key}</td>
                <td>${metadata[key]}</td>
            </tr>`;
        }
        document.getElementById('scheduleAll_meta').innerHTML = dataHtml;

        const cached = Schedulinator.data.cached;
        dataHtml = '';
        for (key in cached) {
            let shouldBold = true;
            Object.values(cached[key]).forEach(e => {
                const readable = this.parseToReadableDate(Schedulinator.stringToDate(key));
                dataHtml += `<tr>
                    <td>${shouldBold ? `<b>${key}</b>` : key}</td>
                    <td>${shouldBold ? `<b>${readable}</b>` : readable}</td>
                    <td>${e.time?.start ?? '-'}</td>
                    <td>${e.time?.end ?? '-'}</td>
                    <td>${e.meetingCount ?? '-'}</td>
                    <td>${e.subject}</td>
                    <td class="bg-${(e.location?.color) ? e.location?.color + ' text-white fw-bold' : '-'}"> ${e.location?.text ?? '-'}</td>
                    <td>${e.type}</td>
                </tr>`;
                shouldBold = false;
            });
        }
        document.getElementById('scheduleAll_data').innerHTML = dataHtml;
    },
    handleClearData() {
        Schedulinator.clearStoredData();
        location.reload();
        return true;
    },
    run() {
        Schedulinator.loadData();

        // Handle metadata
        let meta = Schedulinator.getMetadata();
        if (!meta) {
            document.getElementById('scheduleCodePrompt').classList.remove('d-none');
            return;
        }
        this.elements.metadata.innerHTML = this.renderMetadata(meta);

        // Render schedule
        this.runSpecificDate(new Date);

        // Show
        this.navigation.to('today');

        // TODO: TEMPORARY. PLEASE REMOVE
        //this.navigation.to('editor');
    }
}

addEventListener("DOMContentLoaded", (event) => {
    // Prefill the date input
    let today = new Date;
    [...document.getElementsByClassName("classDate")].forEach(e => {
        e.value = `${today.getFullYear()}-${today.getMonth() + 1}-${(today.getDate()) < 10 ? '0' : ''}${today.getDate()}`;;
    });
    
    SchedulinatorViewer.run();
});
