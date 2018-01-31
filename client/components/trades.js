import {connect} from 'react-redux'
import React from 'react'

// Import React Table
import ReactTable from "react-table";
//import "react-table/react-table.css";

class Trades extends React.Component {
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
          Header: "Trades Audit",
          columns: [
            {
              Header: "Side",
              id: "value",
              accessor: d => d.side
            },
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
              Header: "Date",
              id: "total",
              accessor: d => d.time
            }
          ]
        }
      ]}
      defaultPageSize={10}
      pageSize={this.props.pageSize}
      minRows = {1}
      className="-striped -highlight"
      showPageSizeOptions={false}

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



export default connect(mapState)(Trades)
