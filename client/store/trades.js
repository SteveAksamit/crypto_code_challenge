import axios from 'axios'
import { timeParse } from 'd3-time-format'

const parseDate = timeParse("%Y-%m-%d %I:%M:%p");

/**
 * ACTION TYPES
 */
const GET_TRADES = 'GET_TRADES'

/**
 * INITIAL STATE
 */
const data = []

/**
 * ACTION CREATORS
 */
const getTrades = dataArr => ({ type: GET_TRADES, dataArr })

/**
 * THUNK CREATORS
 */
export const fetchTrades = () =>
  dispatch =>
    axios.get('/api/gdax/trades')
      .then(res =>
        dispatch(getTrades(res.data)))
    .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = data, action) {
  switch (action.type) {
    case GET_TRADES:
    return action.dataArr.map(item => {
      item.date = parseDate(item.date)
      return item
    })
    default:
      return state
  }
}
