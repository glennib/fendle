
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

function combinations_2(input) {
    let temp = []
    for (let i = 0; i < input.length; ++i) {
        for (let j = 0; j < input.length; ++j) {
            if (i != j) {
                temp.push([input[i], input[j]])
            }
        }
    }
    
    let out = []
    while (temp.length > 0) {
        let new_element = temp[0]
        out.push(new_element)
        temp = temp.filter(function f(value) {
            return !(new_element[0] == value[0] && new_element[1] == value[1])
        })
    }
    return out
}
