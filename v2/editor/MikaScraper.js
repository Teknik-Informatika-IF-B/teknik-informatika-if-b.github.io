const MikaScraper = {
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

        let final = [];
        rows.forEach(r => {
            let data = {};
            r.forEach((e, i) => {
                data[headers[i]] = e;
            });
            final.push(data);
        });

        console.log(headers, rows, final);
    }
}