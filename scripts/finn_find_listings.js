function find_listings_mock() {
    out = [
        {
            "id": "00000000",
            "address": "359 N 850 W, Springville, UT 84663, USA"
        },
        {
            "id": "00000001",
            "address": "1438 W 250 N, Springville, UT 84663, USA"
        },
        {
            "id": "00000002",
            "address": "N Park St, Springville, UT 84663, USA"
        },
    ]
    return out
}

function find_listings() {
    console.debug("function find_listings: Finding listings...")
    let listings = document.getElementsByClassName("ads__unit");
    let out = []
    for (const listing of listings) {
        let listingDetailsList = listing.getElementsByClassName("ads__unit__content__details")
        if (listingDetailsList.length != 1) {
            console.debug("function find_listings: More or less than 1 content in details. Skipping.");
            continue
        }
        let listingDetails = listingDetailsList[0]
        let address = listingDetails.innerText
        let finnId = listing.getElementsByClassName("ads__unit__link")[0].id
        listing.id = finnId;
        let data = {
            "id": finnId,
            "address": address
        }
        out.push(data)
        // console.debug("function find_listings: Pushed " + finnId)
    }
    console.debug("function find_listings: Returning...")
    return out;
}

function find_listing(id) {
    let listings = document.getElementsByClassName("ads__unit");
    
}
