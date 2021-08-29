const google_maps_base_url = "https://maps.googleapis.com/maps/api/directions/json?"

function gparameters(origin, destination, mode) {
    let parameters = {
        key: api_key,
        origin: origin,
        destination: destination,
        mode: mode,
        language: language_code,
        units: display_units,
        departure_time: get_next_monday_at(7, 15),
        traffic_model: "best_guess"
    }
    if (mode == "transit") {
        parameters["transit_routing_preference"] = "fewer_transfers"
    }
}

async function gquery(origin, destination, mode) {
    let parameters = gparameters(origin, destination, mode)
    let query_data = new URLSearchParams(parameters)

    let query_url = google_maps_base_url + query_data.toString()

    response = await fetch(query_url)
    return response.json()
}

