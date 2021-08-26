const listing_address = "Cañon City, Colorado"
const goal_address = "Royal Gorge Bridge & Park, Colorado"
const google_maps_base_url = "https://maps.googleapis.com/maps/api/directions/json?"

let query_data = new URLSearchParams({
    key: api_key,
    origin: listing_address,
    destination: goal_address,
})

let query_url = google_maps_base_url + query_data.toString()
console.debug(query_url)

let headers = new Headers()
headers.append("Access-Control-Allow-Origin", "*")
headers.append("Access-Control-Allow-Headers", "*")

fetch(query_url, {
    mode: "cors",
    headers: headers
})
    .then(data => { return data })
    .then(res => { console.log(res) })
