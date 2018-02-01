import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchStartTimerBids, fetchStopTimerBids, fetchStartTimerAsks, fetchStopTimerAsks, fetchOneHourData, fetchOrders, fetchTrades } from '../store'
import CandleStick from '../../candles/src/index'
import { BidOrderBook, AskOrderBook, BuyOrders, SellOrders, Trades, OrderForm } from '../components'
import Rnd from 'react-rnd';
import { Tabs, Tab } from 'react-bootstrap';


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
      obby: 430,
      obbPageSize: 10,
      obawidth: 450,
      obaheight: 405,
      obax: 520,
      obay: 430,
      obaPageSize: 10,
      canwidth: 910,
      canheight: 400,
      canx: 60,
      cany: 0,
      audwidth: 450,
      audheight: 492,
      audx: 1000,
      audy: 0,
      audPageSize: 10,
      forwidth: 200,
      forheight: 300,
      forx: 1475,
      fory: 0,
      key: 1
    }
    this.handleSelect = this.handleSelect.bind(this);
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
  getAudHeight() {
    if (this.state.audheight > 174) {
      return Math.floor((this.state.audheight - 140) / 34)
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
  getAudOffSetHeight(height) {
    if (height > 174) {
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
      return 174
    }
  }
  handleSelect(key) {
    this.setState({ key });
  }


  render() {
    const { orderBookBids, orderBookAsks, orders, trades, isTrader } = this.props
    return (
      <div>
        {isTrader && <Rnd
          size={{ width: this.state.forwidth, height: this.state.forheight }}
          position={{ x: this.state.forx, y: this.state.fory }}
          onDragStop={(e, d) => { this.setState({ forx: d.x, fory: d.y }) }}
          style={{ borderStyle: 'ridge', width: '100%', height: '100%' }}
          z={-1}
          enableResizing={{
            bottom: false,
            bottomLeft: false,
            bottomRight: false,
            left: false,
            right: false,
            top: false,
            topLeft: false,
            topRight: false
          }}
        >
          <OrderForm />
        </Rnd>
        }
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
          style={{ borderStyle: 'ridge', width: '100%', height: '100%' }}
          z={-1}
          minHeight={300}
          minWidth={400}
          onResize={(e, direction, ref, delta, position) => {
            this.setState({
              canwidth: ref.offsetWidth,
              canheight: ref.offsetHeight,
              canx: position.x,
              cany: position.y,
            });
          }}
        >
          <CandleStick propHeight={this.state.canheight} propWidth={this.state.canwidth} />
        </Rnd>

        {Object.keys(orders).length > 0 && orders.bids.length > 0 &&
          <Rnd
            size={{ width: this.state.audwidth, height: this.state.audheight }}
            position={{ x: this.state.audx, y: this.state.audy }}
            onDragStop={(e, d) => { this.setState({ audx: d.x, audy: d.y }) }}
            minHeight={174}
            minWidth={397}
            onResize={(e, direction, ref, delta, position) => {
              let newHeight, newPage
              if (direction === 'right' || direction === 'left') {
                newHeight = this.state.audheight
                newPage = this.state.audPageSize
              } else {
                newHeight = this.getAudOffSetHeight(ref.offsetHeight)
                newPage = this.getAudHeight()
              }
              this.setState({
                audwidth: ref.offsetWidth,
                audheight: newHeight,
                audx: position.x,
                audy: position.y,
                audPageSize: newPage
              });
            }}
          >
            <Tabs
              activeKey={this.state.key}
              onSelect={this.handleSelect}
              id="controlled-tab-example"
            >
              <Tab title="Trades Audit" eventKey={1}>
                <Trades data={trades} pageSize={this.state.audPageSize} />
              </Tab>
              <Tab title="Buy Orders Audit" eventKey={2}>
                <BuyOrders data={orders.bids} pageSize={this.state.audPageSize} />
              </Tab>
              <Tab title="Sell Orders Audit" eventKey={3}>
                <SellOrders data={orders.asks} pageSize={this.state.audPageSize} />
              </Tab>
            </Tabs>
          </Rnd>
        }
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
    oneHourChartData: state.oneHourChartData,
    orders: state.orders,
    trades: state.trades,
    isTrader: state.user.email === 'trader@email.com'
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadBook() {
      dispatch(fetchStartTimerBids())
      dispatch(fetchStartTimerAsks())
      dispatch(fetchOneHourData())
      dispatch(fetchOrders())
      dispatch(fetchTrades())
    },
    closeBook() {
      dispatch(fetchStopTimerBids())
      dispatch(fetchStopTimerAsks())
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

