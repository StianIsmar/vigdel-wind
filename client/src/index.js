import React from 'react'
import ReactDOM from 'react-dom'
import App from './App';
//import './index.css'
import { Provider } from 'react-redux'
import rootReducer from './reducers/rootReducer'
import createSagaMiddleWare from 'redux-saga'

import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import {watchApiAction} from './sagas/sagas'

const sagaMiddleWare = createSagaMiddleWare()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleWare)))
sagaMiddleWare.run(watchApiAction);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)