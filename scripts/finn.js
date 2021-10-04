
function add_to_listing(entry) {
    console.log(entry)
    // let id = entry.listing_info.id
    // let address = entry.listing_info.address

    // let unit = document.getElementById(id)
    // console.debug(unit)
    // console.debug(entry)



    // let destination_queries = entry.destination_queries

    // let fastest_combo = fastest_combination(destination_queries)
    // console.log("Fastest combo: " + fastest_combo.join(", "))

    // let destinations = Object.keys(destination_queries)
}

function main() {
    let listings = find_listings()
    for (const listing of listings) {
        lookup_or_query(listing).then(entry => add_to_listing(entry))
    }
}

main()
