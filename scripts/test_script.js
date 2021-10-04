var global_data = {}

async function query_and_store(id, address) {
    let entry = {}
    global_data[id] = entry
    entry.listing_info = {
        id: id,
        address: address,
    }
    let destination_queries = {}
    for (const destination_info of destination_infos) {
        let mode_queries = {}
        for (const travel_mode of travel_modes) {
            mode_queries[travel_mode] = await
                gquery(address, destination_info.address, travel_mode)
        }
        destination_queries[destination_info.label] = mode_queries
    }
    entry['destination_queries'] = destination_queries
    return entry
}

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
        let modes = Object.keys(mode_queries)
        // for (const mode of modes) {
        let mode = fastest_combo[i]
        let query = mode_queries[mode]
        let text = mode + " ::: "
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

function lookup_or_query(data) {
    if (!("id" in data) || !("address" in data)) {
        console.error("`data` didn't contain either `id` or `address`")
        return
    }
    let id = data.id
    let address = data.address
    if (id in global_data) {
        let entry = global_data[id]
        if ("destination_queries" in entry) {
            add_to_listing(entry)
            return
        }
    }
    query_and_store(id, address)
        .then(entry => add_to_listing(entry))
}

function main() {
    let ul = document.createElement("ul")
    ul.id = "fendle__main_list"
    document.body.appendChild(ul)
    let listings = find_listings_mock()
    for (const listing of listings) {
        lookup_or_query(listing)
    }
}


main()
