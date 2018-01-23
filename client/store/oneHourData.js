import axios from 'axios'
import history from '../history'
import { getData } from '../../candles/src/utils'
import { timeParse } from 'd3-time-format'

const parseDate = timeParse("%Y-%m-%d %I:%M:%p");

/**
 * ACTION TYPES
 */
const GET_ONE_HOUR_CHART_DATA = 'GET_ONE_HOUR_CHART_DATA'

/**
 * INITIAL STATE
 */
const data = []

/**
 * ACTION CREATORS
 */
const getOneHourData = dataArr => ({ type: GET_ONE_HOUR_CHART_DATA, dataArr })

/**
 * THUNK CREATORS
 */
export const fetchOneHourData = () =>
  dispatch =>
    axios.get('/api/gdax/oneHourData')
      .then(res =>
        dispatch(getOneHourData(res.data)))
    .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = data, action) {
  switch (action.type) {
    case GET_ONE_HOUR_CHART_DATA:
      return action.dataArr.map(item => {
        item.date = parseDate(item.date)
        return item
      })
    default:
      return state
  }
}
