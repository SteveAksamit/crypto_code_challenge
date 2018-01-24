import {connect} from 'react-redux'
import React from 'react'

// Import React Table
import ReactTable from "react-table";
//import "react-table/react-table.css";

class BidOrderBook extends React.Component {
  constructor() {
    super();
  }

  render(){
    const {orderBookBids} = this.props

  return (
    <div>
    <ReactTable
      data={orderBookBids}
      columns={[
        {
          Header: "Buy Orders",
          columns: [
            {
              Header: "Price (USD)",
              accessor: "price"
            },
            {
              Header: "Amount (BTC)",
              id: "size",
              accessor: d => d.size
            },
            {
              Header: "Value (USD)",
              id: "value",
              accessor: d => d.value
            },
            {
              Header: "Sum (USD)",
              id: "total",
              accessor: d => d.total
            }
          ]
        }
      ]}
      defaultPageSize={10}
      className="-striped -highlight"
    />
    <br />
  </div>
  )
}
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    orderBook: state.orderBook
  }
}



export default connect(mapState)(BidOrderBook)
