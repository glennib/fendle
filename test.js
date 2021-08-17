console.log("Hi, I'm an extension! Fendle.")

const base_url = "https://maps.googleapis.com/maps/api/directions/json?"


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
        destination: "FFI Kjeller",
    })
    var query_url = base_url + query_data.toString()
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
