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
class UserHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      obbwidth: 450,
      obbheight: 405,
      obbx: 60,
      obby: 450,
      obbPageSize: 10,
      obawidth: 450,
      obaheight: 405,
      obax: 720,
      obay: 450,
      obaPageSize: 10,
      canwidth: 1200,
      canheight: 400,
      canx: 60,
      cany: 0
    }
  }
  componentDidMount() {
    this.props.loadBook()
  }
  componentWillUnmount() {
    this.props.closeBook()
  }
  getObaHeight() {
    if (this.state.obaheight > 86) {
      return Math.floor((this.state.obaheight - 52) / 34)
    } else {
      return 1
    }
  }
  getObbHeight() {
    if (this.state.obbheight > 86) {
      return Math.floor((this.state.obbheight - 52) / 34)
    } else {
      return 1
    }
  }
  getObaOffSetHeight(height) {
    if (height > 86) {
      let amt = height % 34
      if (amt > 28) {
        amt -= 18
      } else if (amt <= 28 && amt > 18) {
        amt -= 9
      } else if (amt <= 18 && amt > 12) {
        amt -= 5
      }
      return (height - (amt / 2))
    } else {
      return 86
    }
  }
  getObbOffSetHeight(height) {
    if (height > 86) {
      let amt = height % 34
      if (amt > 28) {
        amt -= 18
      } else if (amt <= 28 && amt > 18) {
        amt -= 9
      } else if (amt <= 18 && amt > 12) {
        amt -= 5
      }
      return (height - (amt / 2))
    } else {
      return 86
    }
  }

  render() {
    const { orderBookBids, orderBookAsks, oneHourChartData } = this.props
    return (
      <div>
        {orderBookBids.length > 0 &&
          <Rnd
            size={{ width: this.state.obbwidth, height: this.state.obbheight }}
            position={{ x: this.state.obbx, y: this.state.obby }}
            onDragStop={(e, d) => { this.setState({ obbx: d.x, obby: d.y }) }}
            minHeight={86}
            minWidth={403}
            z={-2}
            onResize={(e, direction, ref, delta, position) => {
              let newHeight, newPage
              if (direction === 'right' || direction === 'left') {
                newHeight = this.state.obbheight
                newPage = this.state.obbPageSize
              } else {
                newHeight = this.getObbOffSetHeight(ref.offsetHeight)
                newPage = this.getObbHeight()
              }
              this.setState({
                obbwidth: ref.offsetWidth,
                obbheight: newHeight,
                obbx: position.x,
                obby: position.y,
                obbPageSize: newPage
              });
            }}
          >
            <BidOrderBook orderBookBids={orderBookBids} pageSize={this.state.obbPageSize} obbPageChange={this.obbPageChange} />
          </Rnd>
        }
        {orderBookAsks.length > 0 &&
          <Rnd
            size={{ width: this.state.obawidth, height: this.state.obaheight }}
            position={{ x: this.state.obax, y: this.state.obay }}
            onDragStop={(e, d) => { this.setState({ obax: d.x, obay: d.y }) }}
            minHeight={86}
            minWidth={403}
            z={-1}
            onResize={(e, direction, ref, delta, position) => {
              let newHeight, newPage
              if (direction === 'right' || direction === 'left') {
                newHeight = this.state.obaheight
                newPage = this.state.obaPageSize
              } else {
                newHeight = this.getObaOffSetHeight(ref.offsetHeight)
                newPage = this.getObaHeight()
              }
              this.setState({
                obawidth: ref.offsetWidth,
                obaheight: newHeight,
                obax: position.x,
                obay: position.y,
                obaPageSize: this.getObaHeight()
              });
            }}
          >
            <AskOrderBook orderBookAsks={orderBookAsks} pageSize={this.state.obaPageSize} obaPageChange={this.obaPageChange} />
          </Rnd>
        }


        <Rnd
          size={{ width: this.state.canwidth, height: this.state.canheight }}
          position={{ x: this.state.canx, y: this.state.cany }}
          onDragStop={(e, d) => { this.setState({ canx: d.x, cany: d.y }) }}
          style={{borderStyle: 'ridge', width: '100%', height: '100%'}}
          z={-1}
          onResize={(e, direction, ref, delta, position) => {
            this.setState({
              canwidth: ref.offsetWidth,
              canheight: ref.offsetHeight,
              canx: position.x,
              cany: position.y,
            });
          }}
        >

            <CandleStick  propHeight={this.state.canheight} propWidth={this.state.canwidth}/>

        </Rnd>

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
