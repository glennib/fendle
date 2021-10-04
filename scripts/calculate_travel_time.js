let travel_mode_combinations = combinations_2(available_travel_modes)

function fastest_combination(destination_queries) {
    function measure(values, p) {
        let sum = 0.
        for (const value of values) {
            sum += Math.pow(Math.abs(value), p)
        }
        return Math.pow(sum, 1 / p)
    }

    let destinations = Object.keys(destination_queries)
    if (destinations.length != 2) {
        console.error("Currently only supporting 2 destinations.")
        return
    }

    let measures = []
    let lowest = Infinity
    let lowest_combination = null
    for (const combination of travel_mode_combinations) {
        let costs = []
        for (let i = 0; i < 2; ++i) {
            let mode_queries = destination_queries[destinations[i]]
            let query = mode_queries[combination[i]]
            let cost = Infinity
            if (query.status == "OK") {
                cost = query.routes[0].legs[0].duration.value
            }
            costs.push(cost)
        }
        let combination_cost = measure(costs, 1)
        if (combination_cost < lowest) {
            lowest = combination_cost
            lowest_combination = combination
        }
    }
    return lowest_combination
}
