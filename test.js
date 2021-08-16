console.log("Hi, I'm an extension! Fendle. 5.")
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
    listingsData.push(data)
    console.log(data)
    var tId = document.createTextNode(finnId)
    var pId = document.createElement("p")
    pId.appendChild(tId)
    var tAddress = document.createTextNode(address)
    var pAddress = document.createElement("p")
    pAddress.appendChild(tAddress)
    var commute_container = document.createElement("div")
    commute_container.className = "fendle__commute_container"
    commute_container.id = finnId
    commute_container.appendChild(pId)
    commute_container.appendChild(pAddress)
    listing.appendChild(commute_container)
}
