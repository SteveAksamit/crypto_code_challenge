import { connect } from 'react-redux'
import React from 'react'
import { Form, FormGroup, ControlLabel, FormControl, Button, InputGroup, Radio } from 'react-bootstrap';

// Import React Table
import ReactTable from "react-table";
//import "react-table/react-table.css";


class OrderForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <form>
        <FormGroup controlId="formControlsSelect">
          <FormControl componentClass="select" placeholder="select">
            <option value="select">...</option>
            <option value="btc">BTC-USD</option>
          </FormControl>
        </FormGroup>
        <FormGroup>
          <Radio name="radioGroup" inline>
            Buy
        </Radio>{' '}
          <Radio name="radioGroup" inline>
            Sell
        </Radio>{' '}
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon>$</InputGroup.Addon>
            <FormControl type="text" />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon>BTC</InputGroup.Addon>
            <FormControl type="text" />
          </InputGroup>
        </FormGroup>
        <Button style={{'marginLeft': '12px'}}>Place Order</Button>
      </form>
    );
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



export default connect(mapState)(OrderForm)
