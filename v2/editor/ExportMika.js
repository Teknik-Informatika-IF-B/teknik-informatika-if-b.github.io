const ExportMika = {
    getInputByName(name) {
        return document.querySelector(`input[name=${name}]`);
    },
    scrapeRegularClasses() {
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
                data[headers[i]] = e;
            });
            classes.push(data);
        });

        return {
            
            academicYear: this.getInputByName('tahunAjaran').value,
            
            classes: classes
        }
    }
}