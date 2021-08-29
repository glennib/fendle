const google_maps_base_url = "https://maps.googleapis.com/maps/api/directions/json?"

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

