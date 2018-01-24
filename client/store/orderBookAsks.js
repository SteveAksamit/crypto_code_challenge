import axios from 'axios'
import history from '../history'

let timer = null

/**
 * ACTION TYPES
 */
const GET_ORDER_BOOK_ASKS = 'GET_ORDER_BOOK_ASKS'
const START_TIMER = 'START_TIMER'
const STOP_TIMER = 'STOP_TIMER'

/**
 * INITIAL STATE
 */
const orderBookAsks = []

/**
 * ACTION CREATORS
 */
const getOrderBook = orderBookArr => ({ type: GET_ORDER_BOOK_ASKS, orderBookArr })


/**
 * THUNK CREATORS
 */
export const fetchOrderBookAsks = () =>
  dispatch =>
    axios.get('/api/orderBook/asks')
      .then(res =>
        dispatch(getOrderBook(res.data)))
      .catch(err => console.log(err))

export const fetchStartTimerAsks = () => (dispatch) => {
  clearInterval(timer);
  timer = setInterval(() => dispatch(fetchOrderBookAsks()), 2000);
  dispatch({ type: START_TIMER });
}

export const fetchStopTimerAsks = () => {
  clearInterval(timer);
  return { type: STOP_TIMER };
}

/**
 * REDUCER
 */
export default function (state = orderBookAsks, action) {
  switch (action.type) {
    case GET_ORDER_BOOK_ASKS:
      return action.orderBookArr
    default:
      return state
  }
}
