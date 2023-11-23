const SchedulinatorViewer = {
    elements: {
        today: document.getElementById('todayClasses'),
        upcoming: null,
        metadata: document.getElementById('classMetadata')
    },
    timer: {
        format(display) {
            return function (days, hours, minutes, seconds) {
                display.textContent = (days > 0 ? days + ':' : '') +
                    (hours > 0 ? hours + ':' : '') +
                    (minutes < 10 ? '0' + minutes : minutes) + ':' +
                    (seconds < 10 ? '0' + seconds : seconds);
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
        let colClass = (details.classes.length < 3) ? "col-md-12 col-lg-6" : "col-md-12 col-lg-4";
        let classesHtml = '';
        let classesTimers = [];
        details.classes.forEach(e => {
            classes = this.renderClassCard({ ...e, ...{ date: details.date } });
            classesHtml += classes.html;
            classes.timers.forEach(t => {
                classesTimers.push(t);
            });
        });

        where.innerHTML += `<div class="${colClass}">
            <div class="card">
                <div class="card-header text-center bg-warning">
                    <p class="mb-0"><b>${this.parseToReadableDate(details.date)}</b></p>
                </div>
                <div class="card-body" style="padding: 10px;">
                    ${classesHtml}
                </div>
            </div>
        </div>`;

        let lastRegularTimer = null;
        classesTimers.forEach(timer => {
            // TODO: I think we need to include the tolerance time instead of separating them into two instance
            if (!timer.stop) {
                return;
            }

            let duration = this.timer.secondsUntil(timer.stop);
            if (timer.isTolerance) {
                duration -= this.timer.secondsUntil(lastRegularTimer);
            }
            const timerElement = document.getElementById(`timer_${timer.id}`);
            const countdownTimer = new CountDownTimer(duration, 1000);

            countdownTimer.onTick(this.timer.format(timerElement));

            lastRegularTimer = timer.stop;

            if (!timer.isTolerance) {
                countdownTimer.start();
            } else {
                const parsedDuration = CountDownTimer.parse(duration);
                this.timer.format(timerElement)(0, 0, parsedDuration.minutes, parsedDuration.seconds);
            }
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
            classroomAndTimeIndicator = `<li class="list-group-item">
                <div class="row">
                    <div class="col-6 border-end align-self-center">
                        <b>${details.classroom ?? "Lihat Kartu Ujian"}</b>
                    </div>
                    <div class="col-6 border-start align-self-center">
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

        let timers = [];
        let timerIndicator = '';
        if (["REGULAR", "REPLACEMENT", "EXAM"].includes(details.type)) {
            timers = [
                {
                    id: SchedulinatorViewer.timer.randomId(),
                    stop: this.timer.getDateTimeRepresentation(details.date, details.time.start),
                    isTolerance: false,
                },
                {
                    id: SchedulinatorViewer.timer.randomId(),
                    stop: (details.time.tolerance) ? this.timer.getDateTimeRepresentation(details.date, details.time.tolerance) : false,
                    isTolerance: true,
                }
            ];

            let toleranceText = (!details.time.tolerance) ? 'N/A' : '...'
            timerIndicator = `<li class="list-group-item">
                <div class="row">
                    <div class="col-6 border-end align-self-center">
                        Mulai: <b id="timer_${timers[0].id}">...</b>
                    </div>
                    <div class="col-6 border-start align-self-center">
                        Toleransi: <b id="timer_${timers[1].id}">${toleranceText}</b>
                    </div>
                </div>
            </li>`;
        } else if (["BREAK"].includes(details.type)) {
            timers = [
                {
                    id: SchedulinatorViewer.timer.randomId(),
                    stop: this.timer.getDateTimeRepresentation(details.date, details.time.start),
                    isTolerance: false,
                },
                {
                    id: SchedulinatorViewer.timer.randomId(),
                    stop: this.timer.getDateTimeRepresentation(details.date, details.time.end),
                    isTolerance: true,
                }
            ];

            timerIndicator = `<li class="list-group-item">
                <div class="row">
                    <div class="col-6 border-end align-self-center">
                        Mulai: <b id="timer_${timers[0].id}">...</b>
                    </div>
                    <div class="col-6 border-start align-self-center">
                        Sisa: <b id="timer_${timers[1].id}">...</b>
                    </div>
                </div>
            </li>`;
        }

        return {
            html:
                `<div class="col-md-12 col-lg-4">
                <div class="card mb-3">
                    <ul class="list-group list-group-flush text-center">
                        ${examIndicator}
                        ${meetingTypeIndicator}
                        <li class="list-group-item"><b class="font-larger">${details.subject}</b></li>
                        ${classroomAndTimeIndicator}
                        ${timerIndicator}
                    </ul>
                </div>
            </div>`,
            timers: timers
        }
    },
    renderMetadata(data) {
        return `<h1 class="mb-0 font-x-large">${data.major}</h1>
        <small>Semester ${data.semester}, ${data.class}, ${data.academicYear}</small>`;
    },
    run() {
        // Handle metadata
        let meta = Schedulinator.getMetadata();
        if (!meta) {
            // Not ready
            // Ask user to enter class code or something
            return;
        }
        this.elements.metadata.innerHTML = this.renderMetadata(meta);

        // Handle today's classes
        this.renderDayCard(this.elements.today, {
            date: new Date,
            classes: Schedulinator.getTodaysSchedule()
        });

        // Handle upcoming classes

    }
}

// var display1 = document.querySelector('#time1'),
//     display2 = document.querySelector('#time2'),
//     timer1 = new CountDownTimer(5),
//     timer2 = new CountDownTimer(10);
// timer1.onTick(format(display1)).onTick(restart).start();
// timer2.onTick(format(display2)).start();