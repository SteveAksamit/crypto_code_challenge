import axios from 'axios'
import { timeParse } from 'd3-time-format'

const parseDate = timeParse("%Y-%m-%d %I:%M:%p");

/**
 * ACTION TYPES
 */
const GET_ONE_MONTH_CHART_DATA = 'GET_ONE_MONTH_CHART_DATA'

/**
 * INITIAL STATE
 */
const data = []

/**
 * ACTION CREATORS
 */
const getOneMonthData = dataArr => ({ type: GET_ONE_MONTH_CHART_DATA, dataArr })

/**
 * THUNK CREATORS
 */
export const fetchOneMonthData = () =>
  dispatch =>
    axios.get('/api/gdax/oneMonthData')
      .then(res =>
        dispatch(getOneMonthData(res.data)))
    .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = data, action) {
  switch (action.type) {
    case GET_ONE_MONTH_CHART_DATA:
      return action.dataArr.map(item => {
        item.date = parseDate(item.date)
        return item
      })
    default:
      return state
  }
}
