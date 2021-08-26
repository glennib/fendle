const listing_address = "Cañon City, Colorado"
const goal_address = "Royal Gorge Bridge & Park, Colorado"
const google_maps_base_url = "https://maps.googleapis.com/maps/api/directions/json?"

let global = []

async function gquery(origin, destination) {
    let query_data = new URLSearchParams({
        key: api_key,
        origin: origin,
        destination: destination,
    })

    let query_url = google_maps_base_url + query_data.toString()

    response = await fetch(query_url)
    return response.json()
}

function append_paragraph(data)
{
    let p = document.createElement("p")
    let text = JSON.stringify(data.duration, null, 4)
    p.appendChild(document.createTextNode(text))
    document.body.appendChild(p)
}

function process_response(data) {
    if (data.status != "OK") {
        console.log("Status wasn't OK, it was `" + data.status + "`")
        return
    }
    leg = data.routes[0].legs[0]
    relevant_data = {
        distance: leg.distance,
        duration: leg.duration
    }
    global.push(relevant_data)
    append_paragraph(relevant_data)
}

function lookup(origin, destination) {
    gquery(origin, destination).then(data => process_response(data))
}

lookup(listing_address, goal_address)
console.debug("Made queries")
