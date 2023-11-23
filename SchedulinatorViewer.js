const SchedulinatorViewer = {
    elements: {
        today: document.getElementById('todayClasses'),
        upcoming: null,
        metadata: document.getElementById('classMetadata')
    },
    parseToReadableDate(date) {
        let months = ["Januari", "Febuari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        let days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        let day = days[date.getDay()];
        let month = months[date.getMonth()];
        return `${day}, ${date.getDate()} ${month} ${date.getFullYear()}`;
    },
    renderDayCard(details) {
        let colClass = (details.classes.length < 3) ? "col-md-12 col-lg-6" : "col-md-12 col-lg-4";
        let classesHtml = '';
        details.classes.forEach(e => {
            classesHtml += this.renderClassCard(e).html;
        });

        // TODO: Handle timers and countdowns

        return `<div class="${colClass}">
            <div class="card">
                <div class="card-header text-center bg-warning">
                    <p class="mb-0"><b>${this.parseToReadableDate(details.date)}</b></p>
                </div>
                <div class="card-body" style="padding: 10px;">
                    ${classesHtml}
                </div>
            </div>
        </div>`;
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

        let timerIndicator = '';
        if (["REGULAR", "REPLACEMENT", "EXAM"].includes(details.type)) {
            timerIndicator = `<li class="list-group-item">
                <div class="row">
                    <div class="col-6 border-end align-self-center">
                        Mulai: <b id="timer_">...</b>
                    </div>
                    <div class="col-6 border-start align-self-center">
                        Toleransi: <b id="timer_">...</b>
                    </div>
                </div>
            </li>`;
        } else if (["BREAK"].includes(details.type)) {
            timerIndicator = `<li class="list-group-item">Sisa waktu: <b>...</b></li>`;
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
            </div>`
        }
    },
    renderMetadata(data) {
        return `<h1 class="mb-0 font-x-large">${data.major}</h1>
        <small>Semester ${data.semester}, ${data.class}, ${data.academicYear}</small>`;
    },
    render(where, what) {
        where.innerHTML = '';
        where.innerHTML = this.renderDayCard(what);
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
        this.render(this.elements.today, {
            date: new Date,
            classes: Schedulinator.getTodaysSchedule()
        });

        // Handle upcoming classes

    }
}