
import React from 'react';
import { render } from 'react-dom';
import Chart from './Chart';
import { getData } from "./utils"

import { TypeChooser } from "react-stockcharts/lib/helper";
import {connect} from 'react-redux'
import { fetchOneHourData } from '../../client/store'

class CandleStick extends React.Component {

	componentDidMount() {
		this.props.loadInitialData()
	}

	render() {
		const data = this.props.data
		return (
			 this.props.data.length > 0 &&
			<Chart type="hybrid" data={data} />
		)
	}
}

const mapState = (state) => {
  return {
    data: state.oneHourData
  }
}

const mapDispatch = (dispatch) => {
	return {
		loadInitialData() {
			dispatch(fetchOneHourData())
		}
	}
}

export default connect(mapState, mapDispatch)(CandleStick)
