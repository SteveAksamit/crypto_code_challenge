import axios from 'axios'
import { timeParse } from 'd3-time-format'

const parseDate = timeParse("%Y-%m-%d %I:%M:%p");

/**
 * ACTION TYPES
 */
const GET_THREE_MONTH_CHART_DATA = 'GET_THREE_MONTH_CHART_DATA'

/**
 * INITIAL STATE
 */
const data = []

/**
 * ACTION CREATORS
 */
const getThreeMonthData = dataArr => ({ type: GET_THREE_MONTH_CHART_DATA, dataArr })

/**
 * THUNK CREATORS
 */
export const fetchThreeMonthData = () =>
  dispatch =>
    axios.get('/api/gdax/threeMonthData')
      .then(res =>
        dispatch(getThreeMonthData(res.data)))
    .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = data, action) {
  switch (action.type) {
    case GET_THREE_MONTH_CHART_DATA:
      return action.dataArr.map(item => {
        item.date = parseDate(item.date)
        return item
      })
    default:
      return state
  }
}
