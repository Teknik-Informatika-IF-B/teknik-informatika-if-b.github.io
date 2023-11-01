var Schedulinator = {
    date: (new Date),
    schedule: {
        today: {},
        upcoming: {}
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
    
}