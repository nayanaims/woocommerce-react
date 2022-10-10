import combineReducers from './redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

const store = createStore(combineReducers, applyMiddleware(thunk))

export default store