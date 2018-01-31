import {connect} from 'react-redux'
import React from 'react'

// Import React Table
import ReactTable from "react-table";
//import "react-table/react-table.css";

class BuyOrders extends React.Component {
  constructor() {
    super();
  }

  render(){
    const {data} = this.props

  return (
    <ReactTable
      data={data}
      columns={[
        {
          Header: "Buy Orders Audit",
          columns: [
            {
              Header: "Price (USD)",
              id: "price",
              accessor: d => '$' + (+d[0]).toFixed(2)
            },
            {
              Header: "Amount (BTC)",
              id: "size",
              accessor: d => d[1]
            },
            {
              Header: "Order ID",
              id: "orderId",
              accessor: d => d[2]
            }
          ]
        }
      ]}
      defaultPageSize={10}
      minRows = {1}
      className="-striped -highlight"
      showPageSizeOptions={false}
      pageSize={this.props.pageSize}
    />
  )
}
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    orders: state.orders
  }
}



export default connect(mapState)(BuyOrders)
