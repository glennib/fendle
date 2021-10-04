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

async function lookup_or_query(data) {
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
            return entry
        }
    }
    return query_and_store(id, address)
}
