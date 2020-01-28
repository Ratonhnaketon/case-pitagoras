import React from 'react'
import ReactDOM from 'react-dom'
import './assets/styles/index.css'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import App from './App'
import rootReducer  from './reducers'
import rootSaga  from './sagas'
import * as serviceWorker from './serviceWorker'


const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()
