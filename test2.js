console.log("Hi from test2! abcde")

const base_url = "https://maps.googleapis.com/maps/api/directions/json?"

console.log("What happened")


var query_data = new URLSearchParams({
    key: api_key,
    origin: "Brånåstoppen 38B, Skedsmokorset",
    destination: "FFI Kjeller",
})

var query_url = base_url + query_data.toString()

console.log(query_url)

