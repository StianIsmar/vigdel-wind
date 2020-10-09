import { takeEvery, put, call, delay } from "redux-saga/effects";
import fetchJsonp from 'fetch-jsonp';
import moment from 'moment-timezone';
import axios from 'axios'

const fetchSwellApiSuccess = (waves) => {
  return {
    type: "UPDATE_SWELL_DATA",
    waves: waves,
  };
};

const fetchWindApiSuccess = (wind) => {
  return {
    type: "UPDATE_WIND_DATA",
    wind: wind,
  };
};

const makeApiCall = (url) => {
  let fetchURL = url

  // Use middleware to dispatch several functions and wait for the HTTP response.
  return fetchJsonp(fetchURL, {
    mode: 'no-cors' // 'cors' by default
  })

};

const getYrWind = (yrUrl) => {


  // make api call with axios
  // axios call to the api
  return axios.get(
    yrUrl,
    {
      "Content-Type": "application/json; charset=utf-8",
    }
  )
}

function* getSwellFromApi() {
  // API call to get data
  try {
    const res = yield call(makeApiCall, `http://magicseaweed.com/api/151b5ebfa8e5c565c9b3667a40de4725/forecast/?spot_id=1886&units=eu&fields=localTimestamp,wind.*,swell.*,condition.temperature`);
    const json = yield call([res, 'json'])
    yield put(fetchSwellApiSuccess(json));
    console.log(json)

    const [feisteinFyrLat, feisteinFyrLong] = [58.8263795, 5.5034463]
    const yrUrl = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${feisteinFyrLat}&lon=${feisteinFyrLong}`
    const yrRes = yield call(getYrWind, yrUrl);
    const yrData = yrRes.data.properties.timeseries

    const windObjects = []

    for (var key in yrData) {
      if (yrData.hasOwnProperty(key)) {
        const windObj = { time: yrData[key].time, time_epoch: moment(yrData[key].time).valueOf(), speed: yrData[key].data.instant.details.wind_speed, direction: yrData[key].data.instant.details.wind_from_direction }
        windObjects.push(windObj)
      }
    }
    yield put(fetchWindApiSuccess(windObjects));


    console.log(windObjects)
    // build up new object here

  } catch (error) {
    console.log("Failed to get data.");
  }
}

export function* watchApiAction() {
  yield takeEvery("GET_SWELL_FROM_API", getSwellFromApi);
}
