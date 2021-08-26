const google_maps_base_url = "https://maps.googleapis.com/maps/api/directions/json?"
var g_data = {}

function find_listings() {
    console.debug("function find_listings: Finding listings...")
    let listings = document.getElementsByClassName("ads__unit");
    console.debug(listings)
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
        let data = {
            "id": finnId,
            "address": address
        }
        out.push(data)
        console.debug("function find_listings: Pushed...")
    }
    console.debug("function find_listings: Returning...")
    return out;
}



function main() {
    console.debug("function main: Hi, I'm an extension! Fendle.")
    let listings = find_listings();
    for (const listing of listings)
    {
        g_data[listing.id] = {"address": listing.address}
    }
    console.debug(g_data)
    console.debug(JSON.stringify(g_data, null, 4))
}
console.debug("\n\nRestarting!")
main()

var listings = document.getElementsByClassName("ads__unit");
var listingsData = []
for (const listing of listings) {
    var listingDetails = listing.getElementsByClassName("ads__unit__content__details")[0]
    var address = listingDetails.innerText
    var finnId = listing.getElementsByClassName("ads__unit__link")[0].id
    var data = {
        "id": finnId,
        "address": address
    }

    var query_data = new URLSearchParams({
        key: api_key,
        origin: address,
        destination: "Royal Gorge Bridge & Park, Colorado",
    })
    var query_url = google_maps_base_url + query_data.toString()
    var request = new XMLHttpRequest();
    request.open("GET", query_url, false)
    request.send(null)
    var response = request.response
    var duration = response.routes[0].legs[0].duration.text

    listingsData.push(data)
    console.log(data)

    var pId = document.createElement("p")
    pId.appendChild(document.createTextNode(duration))
    var pAddress = document.createElement("p")
    pAddress.appendChild(document.createTextNode(address))
    var commute_container = document.createElement("div")
    commute_container.className = "fendle__commute_container"
    commute_container.id = finnId
    commute_container.appendChild(pId)
    commute_container.appendChild(pAddress)
    listing.appendChild(commute_container)


}
