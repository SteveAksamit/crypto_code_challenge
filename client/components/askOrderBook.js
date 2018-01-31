import {connect} from 'react-redux'
import React from 'react'

// Import React Table
import ReactTable from "react-table";
//import "react-table/react-table.css";

class AskOrderBook extends React.Component {
  constructor() {
    super();
  }

  render(){
    const {orderBookAsks} = this.props

  return (
    <ReactTable
      data={orderBookAsks}
      columns={[
        {
          Header: "Sell Orders",
          columns: [
            {
              Header: "Price (USD)",
              id: "price",
              accessor: d => '$' + (+d.price).toFixed(2)
            },
            {
              Header: "Amount (BTC)",
              id: "size",
              accessor: d => d.size
            },
            {
              Header: "Value (USD)",
              id: "value",
              accessor: d => '$' + d.value.toFixed(2)
            },
            {
              Header: "Sum (USD)",
              id: "total",
              accessor: d => '$' + d.total.toFixed(2)
            }
          ]
        }
      ]}
      defaultPageSize={10}
      pageSize={this.props.pageSize}
      minRows = {1}
      className="-striped -highlight"
      showPageSizeOptions={false}
      showPagination={false}

    />
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



export default connect(mapState)(AskOrderBook)
