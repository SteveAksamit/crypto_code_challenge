import axios from 'axios'
import { timeParse } from 'd3-time-format'

const parseDate = timeParse("%Y-%m-%d %I:%M:%p");

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'

/**
 * INITIAL STATE
 */
const data = {bids: [], asks: []}

/**
 * ACTION CREATORS
 */
const getOrders = dataArr => ({ type: GET_ORDERS, dataArr })

/**
 * THUNK CREATORS
 */
export const fetchOrders = () =>
  dispatch =>
    axios.get('/api/gdax/orders')
      .then(res =>
        dispatch(getOrders(res.data)))
    .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = data, action) {
  switch (action.type) {
    case GET_ORDERS:
    return { ...state, bids: action.dataArr.bids, asks: action.dataArr.asks }
    default:
      return state
  }
}
