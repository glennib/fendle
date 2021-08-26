console.debug("Hi from all.js")

let g_data = {
    "214433032": {
        "address": "Øvregate 97, Skien"
    },
    "223000350": {
        "address": "Øvre Fredlundveien 21B, Bergen"
    }
}

const goal_address = "Royal Gorge Bridge & Park, Colorado"
const google_maps_base_url = "https://maps.googleapis.com/maps/api/directions/json?"

class GmapsQuerier
{
    constructor(id) {
        this.entry = g_data[id];
    }

    handleEvent(event) {
        console.debug(event)
        response = event.response
        this.entry.duration_text = response.routes[0].legs[0].duration.text
        console.debug(g_data)
    }
}

function assign_travel_data(id) {
    console.debug("assign_travel_data")
    if (!(id in g_data)) {
        console.debug("assign_travel_data: id was not in g_data, returning")
        return
    }
    let entry = g_data[id]

    if ("travel_time" in entry) {
        console.debug("assign_travel_data: travel_time was in entry for id, returning")
        return
    }
    else {
        if (!("address" in entry)) {
            console.debug("assign_travel_data: address was not in entry for id, returning")
            return null;
        }
        let query_data = new URLSearchParams({
            key: api_key,
            origin: entry.address,
            destination: goal_address,
        })
        let query_url = google_maps_base_url + query_data.toString();
        console.debug("assign_travel_data: url=" + query_url)
        
    }
}

console.debug(g_data)
assign_travel_data("214433032")

