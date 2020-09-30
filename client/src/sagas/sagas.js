import { takeEvery, put, call, delay } from "redux-saga/effects";
import axios from 'axios'

const fetchApiSuccess = (wind) => {
    return {
        type: "UPDATE_WIND_DATA",
        wind: wind
    }

}

const makeApiCall = (url) => {

    return axios.get(
        url,
        { "Content-Type": "application/json; charset=utf-8" }
    )
}

function* getWindFromApi() {
    // API call to get data
    const res = yield call(makeApiCall, `http://localhost:3002/getwind`);
    console.log(res.data.recordsets)
    yield put(fetchApiSuccess(res.data.recordsets[0]))
}

export function* watchApiAction() {
    yield takeEvery("GET_WIND_FROM_API", getWindFromApi)
}