import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchStartTimerBids, fetchStopTimerBids, fetchStartTimerAsks, fetchStopTimerAsks } from '../store'
import CandleStick from '../../candles/src/index'
import {BidOrderBook, AskOrderBook} from '../components'


/**
 * COMPONENT
 */
class UserHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      book: {}
    }
  }
  componentDidMount() {
    this.props.loadBook()
  }
  componentWillUnmount(){
    this.props.closeBook()
  }

  render() {
    const {orderBookBids, orderBookAsks} = this.props
console.log(orderBookAsks)
    return (
      <div >
        <h3 style={{ 'textAlign': 'center', 'fontSize': '1.5vw' }}>BTC-USD 3-Day Price Chart</h3>
        <CandleStick />
        {orderBookBids.length > 0 && orderBookAsks.length > 0 &&
          <div>
            <BidOrderBook orderBookBids={orderBookBids} />
            <AskOrderBook orderBookAsks={orderBookAsks} />
          </div> }
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    orderBookAsks: state.orderBookAsks,
    orderBookBids: state.orderBookBids
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadBook() {
      dispatch(fetchStartTimerBids())
      dispatch(fetchStartTimerAsks())
    },
    closeBook() {
      dispatch(fetchStopTimerBids())
      dispatch(fetchStopTimerAsks())
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

