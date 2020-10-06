const initialState = {
    times: [],
    windStrengths: [],
    windDirections: []
};

const parseTimeData = (wind) => {
    let times = []
    let windStrengths = []
    let windDirections = []
    for (var i = 0; i < wind.length; i++) {
        times.push(wind[i]['RecordedTime'])
        windStrengths.push(wind[i]['WindStrength'])
        windDirections.push(wind[i]['WindDirection'])
    }
    windStrengths = windStrengths.map(Number) 
    console.log(windStrengths)


    return { times, windStrengths, windDirections }
}

const swellReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_WIND_DATA":
            var { times, windStrengths, windDirections } = parseTimeData(action.wind)

            return { ...state, times, windStrengths, windDirections };
        default:
            return state;
    }
};

export default swellReducer;
