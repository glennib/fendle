
const monday = 1

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function get_next_monday_at(hour, minute = 0) {
    let date = new Date() // Now
    date = date.addDays(1) // Tomorrow
    date.setHours(hour, minute, 0, 0) // At hour
    while (date.getDay() != monday) { // Find next monday
        date = date.addDays(1)
    }
    return date
}
