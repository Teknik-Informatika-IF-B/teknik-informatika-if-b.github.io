const ExportMika = {
    getInputByName(name) {
        return document.querySelector(`input[name=${name}]`);
    },
    getSelectorValueByName(name) {
        let select = document.getElementById(name);
        return select.options[select.selectedIndex].text;
    },
    translateSemesterToInt(s) {
        return {
            'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5, 'VI': 6,
            'VII': 7, 'VIII': 8, 'IX': 9, 'X': 10, 'XI': 11, 'XII': 12
        }[s] ?? s;
    },
    exportCurrent() {
        let table = document.getElementsByClassName('mika-table')[0];
        let tableHeader = table.firstElementChild.firstElementChild;
        let tableBody = table.lastElementChild;
        let headers = [];
        let rows = [];
        
        [...tableHeader.children].forEach(e => {
            headers.push(e.textContent);
        });
        [...tableBody.children].forEach(e => {
            let row = [];
            [...e.children].forEach(c => {
                row.push(c.textContent);
            });
            rows.push(row);
        });

        let classes = [];
        rows.forEach(r => {
            let data = {};
            r.forEach((e, i) => {
                data[headers[i].replaceAll(' ', '_').toLowerCase()] = e;
            });
            classes.push(data);
        });

        let major = this.getSelectorValueByName('peminatan').split(' - ');
        
        return {
            major: major[1],
            majorCode: major[0],
            class: classes[0].kelas.replaceAll(' ', ''),
            semester: this.translateSemesterToInt(this.getSelectorValueByName('semester')),
            classes: classes,
            academicYear: this.getInputByName('tahunAjaran').value,
        }
    },
    exportCurrentToJson() {
        console.log(JSON.stringify(this.exportCurrent()));
    }
}