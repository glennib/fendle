
function add_to_listing(entry) {
    let id = entry.listing_info.id
    let address = entry.listing_info.address
    let listing_li = document.createElement("li")
    listing_li.appendChild(document.createTextNode(id + ": " + address))

    let destinations_ul = document.createElement("ul")

    let destination_queries = entry.destination_queries

    let fastest_combo = fastest_combination(destination_queries)
    console.log("Fastest combo: " + fastest_combo.join(", "))

    let destinations = Object.keys(destination_queries)
    let i = 0
    for (const destination of destinations) {
        let destination_li = document.createElement("li")
        destination_li.appendChild(document.createTextNode(destination))

        let modes_ul = document.createElement("ul")
        let mode_queries = destination_queries[destination]
        // let modes = Object.keys(mode_queries)
        // for (const mode of modes) {
        let mode = fastest_combo[i]
        let img = document.createElement("img")
        img.height = "18"
        img.width = "18"
        switch (mode) {
            case "driving":
                img.src = "../icons/car.svg"
                break;
            case "transit":
                img.src = "../icons/bus.svg"
                break;
            case "bicycling":
                img.src = "../icons/bicycle.svg"
                break;
            default:
                img.src = "../question-mark.svg"
                break;
        }
        let query = mode_queries[mode]
        let text = " "
        let box = document.createElement("div")
        if (query.status == "OK") {
            let leg = query.routes[0].legs[0]
            let distance = leg.distance
            let duration = leg.duration
            text += "Distance: " + distance.text
            text += ", "
            text += "Duration: " + duration.text
            if (duration.value <= duration_limits.good) {
                box.className = "textBox green"
            }
            else if (duration.value < duration_limits.fair) {
                box.className = "textBox yellow"
            }
            else {
                box.className = "textBox red"
            }
        }
        else {
            text += "Travel mode unavailable."
            box.className = "textBox gray"
        }
        let mode_li = document.createElement("li")
        box.appendChild(img)
        box.appendChild(document.createTextNode(text))
        mode_li.appendChild(box)
        modes_ul.appendChild(mode_li)
        // }
        destination_li.appendChild(modes_ul)
        destinations_ul.appendChild(destination_li)
        i += 1
    }

    listing_li.appendChild(destinations_ul)

    let main_list = document.getElementById("fendle__main_list")
    main_list.appendChild(listing_li)
}

function main() {
    let ul = document.createElement("ul")
    ul.id = "fendle__main_list"
    document.body.appendChild(ul)
    let listings = find_listings_mock()
    for (const listing of listings) {
        lookup_or_query(listing).then(entry => add_to_listing(entry))
    }
}

main()
