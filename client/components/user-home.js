import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchStartTimerBids, fetchStopTimerBids, fetchStartTimerAsks, fetchStopTimerAsks, fetchOneHourData } from '../store'
import CandleStick from '../../candles/src/index'
import { BidOrderBook, AskOrderBook } from '../components'
import Rnd from 'react-rnd';


/**
 * COMPONENT
 */
class UserHome extends Component  {
  constructor(props) {
    super(props)
    this.state = {
      obbwidth: 550,
      obbheight: 550,
      obbx: 20,
      obby: 450,
      obawidth: 550,
      obbaheight: 550,
      obax: 720,
      obay: 450,
      canwidth: 1200,
      canaheight: 500,
      canx: 0,
      cany: 0
    }

  }
  componentDidMount() {
    this.props.loadBook()
  }
  componentWillUnmount() {
    this.props.closeBook()
  }


  render() {
    const { orderBookBids, orderBookAsks, oneHourChartData } = this.props
    return (
      <div>
        {orderBookBids.length > 0 &&
          <div>
            <Rnd
              size={{ width: this.state.obbwidth, height: this.state.obbheight }}
              position={{ x: this.state.obbx, y: this.state.obby }}
              onDragStop={(e, d) => { this.setState({ obbx: d.x, obby: d.y }) }}
              onResize={(e, direction, ref, delta, position) => {
                this.setState({
                  obbwidth: ref.offsetWidth,
                  obbheight: ref.offsetHeight,
                  ...position,
                });
              }}
            >
            <BidOrderBook orderBookBids={orderBookBids} />
            </Rnd>
          </div>}
          {orderBookAsks.length > 0 &&
            <div>
              <Rnd
                size={{ width: this.state.obawidth, height: this.state.obaheight }}
                position={{ x: this.state.obax, y: this.state.obay }}
                onDragStop={(e, d) => { this.setState({ obax: d.x, obay: d.y }) }}
                onResize={(e, direction, ref, delta, position) => {
                  this.setState({
                    obawidth: ref.offsetWidth,
                    obaheight: ref.offsetHeight,
                    ...position,
                  });
                }}
              >
              <AskOrderBook orderBookAsks={orderBookAsks} />
              </Rnd>
            </div>}

              <div>
                <Rnd
                  size={{ width: this.state.canwidth, height: this.state.canheight }}
                  position={{ x: this.state.canx, y: this.state.cany }}
                  enableResizing={{top:true, right:true, bottom:true, left:true, topRight:true, bottomRight:true, bottomLeft:true, topLeft:true}}
                  onDragStop={(e, d) => { this.setState({ canx: d.x, cany: d.y }) }}
                  onResize={(e, direction, ref, delta, position) => {
                    this.setState({
                      canwidth: ref.offsetWidth,
                      canheight: ref.offsetHeight,
                      ...position,
                    });
                  }}
                >
                <CandleStick />
                </Rnd>
              </div>
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
    orderBookBids: state.orderBookBids,
    oneHourChartData: state.oneHourChartData
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadBook() {
      dispatch(fetchStartTimerBids())
      dispatch(fetchStartTimerAsks())
      dispatch(fetchOneHourData())
    },
    closeBook() {
      dispatch(fetchStopTimerBids())
      dispatch(fetchStopTimerAsks())
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

// <h3 style={{ 'textAlign': 'center', 'fontSize': '1.5vw' }}>BTC-USD 3-Day Price Chart</h3>
//         <CandleStick />
//         {orderBookBids.length > 0 && orderBookAsks.length > 0 &&
//           <div>
//             <BidOrderBook orderBookBids={orderBookBids} />
//             <AskOrderBook orderBookAsks={orderBookAsks} />
//           </div> }
