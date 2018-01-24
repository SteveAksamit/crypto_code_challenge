import axios from 'axios'
import history from '../history'

let timer = null

/**
 * ACTION TYPES
 */
const GET_ORDER_BOOK_BIDS = 'GET_ORDER_BOOK_BIDS'
const START_TIMER = 'START_TIMER'
const STOP_TIMER = 'STOP_TIMER'

/**
 * INITIAL STATE
 */
const orderBookBids = []

/**
 * ACTION CREATORS
 */
const getOrderBook = orderBookArr => ({ type: GET_ORDER_BOOK_BIDS, orderBookArr })


/**
 * THUNK CREATORS
 */
export const fetchOrderBookBids = () =>
  dispatch =>
    axios.get('/api/orderBook/bids')
      .then(res =>
        dispatch(getOrderBook(res.data)))
      .catch(err => console.log(err))

export const fetchStartTimerBids = () => (dispatch) => {
  clearInterval(timer);
  timer = setInterval(() => dispatch(fetchOrderBookBids()), 2000);
  dispatch({ type: START_TIMER });
}

export const fetchStopTimerBids = () => {
  clearInterval(timer);
  return { type: STOP_TIMER };
}

/**
 * REDUCER
 */
export default function (state = orderBookBids, action) {
  switch (action.type) {
    case GET_ORDER_BOOK_BIDS:
      return action.orderBookArr
    default:
      return state
  }
}
