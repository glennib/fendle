var global_data = { }

async function query_and_store(id, address) {
    let entry = { }
    global_data[id] = entry
    entry['id'] = id
    entry['address'] = address
    let query_info = {
        'driving_1': await gquery(address, destination_address_1, "driving"),
        'transit_1': await gquery(address, destination_address_1, "transit"),
        'driving_2': await gquery(address, destination_address_2, "driving"),
        'transit_2': await gquery(address, destination_address_2, "transit"),
    }
    entry['query_info'] = query_info
    return entry
}

function add_to_listing(entry) {
    let id = entry.id
    let query_info = entry.query_info
    console.debug("Added listing with id " + id)
    console.debug(query_info)
    let address = entry.address
    let leg = query_info.routes[0].legs[0]
    let distance = leg.distance
    let duration = leg.duration
    let p = document.createElement("p")
    let text = ""
    text += "Address: " + address
    text += ", "
    text += "Distance: " + distance.text
    text += ", "
    text += "Duration: " + duration.text
    p.appendChild(document.createTextNode(text))
    document.body.appendChild(p)
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
        if ("query_info" in entry) {
            add_to_listing(entry)
            return
        }
    }
    query_and_store(id, address)
        .then(entry => add_to_listing(entry))
}

function main() {
    let listings = find_listings_mock()
    for (const listing of listings) {
        lookup_or_query(listing)
    }
}


main()
