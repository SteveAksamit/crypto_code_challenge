import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import CandleStick from '../../candles/src/index'
/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email} = props

  return (
    <div >
    <h3 style={{ 'textAlign': 'center', 'font-size': '1.5vw' }}>BTC-USD 3-Day Price Chart</h3>
    <CandleStick />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
