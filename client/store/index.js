import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import oneHourData from './oneHourData'
import oneMonthData from './oneMonthData'
import threeMonthData from './threeMonthData'
import orderBookBids from './orderBookBids'
import orderBookAsks from './orderBookAsks'

const reducer = combineReducers({user, oneHourData, oneMonthData, orderBookAsks, orderBookBids, threeMonthData})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './oneHourData'
export * from './oneMonthData'
export * from './threeMonthData'
export * from './orderBookBids'
export * from './orderBookAsks'
