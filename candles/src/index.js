
import React from 'react';
import { render } from 'react-dom';
import Chart from './Chart';
import { getData } from "./utils"

import { TypeChooser } from "react-stockcharts/lib/helper";
import { connect } from 'react-redux'
import { fetchOneHourData, fetchOneMonthData, fetchThreeMonthData } from '../../client/store'

class CandleStick extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selected: 1
		}
		this.handleClick = this.handleClick.bind(this)
	}
	componentDidMount() {
		this.props.loadInitialData()
	}
	handleClick(e) {
		this.setState({ selected: +e.target.value })
	}

	render() {
		let data
		switch (this.state.selected) {
			case 2:
				data = this.props.data2
				break;
			case 3:
				data = this.props.data3
				break;
			default:
				data = this.props.data1
		}
		return (
			this.props.data1.length > 0 &&
			<div>
				<button style={this.state.selected === 1 ? { background: '#ccffff', width: '41px' } : { width: '41px' }} value={1} onClick={this.handleClick}>3D </button>
				{this.props.data2.length > 0 && <button style={this.state.selected === 2 ? { background: '#ccffff', width: '41px' } : { width: '41px' }} value={2} onClick={this.handleClick}>30D</button>}
				{this.props.data3.length > 0 && <button style={this.state.selected === 3 ? { background: '#ccffff', width: '41px' } : { width: '41px' }} value={3} onClick={this.handleClick}>90D</button>}
				<Chart type="hybrid" data={data} propHeight={this.props.propHeight} propWidth={this.props.propWidth} />
			</div>
		)
	}
}

const mapState = (state) => {
	return {
		data1: state.oneHourData,
		data2: state.oneMonthData,
		data3: state.threeMonthData
	}
}

const mapDispatch = (dispatch) => {
	return {
		loadInitialData() {
			dispatch(fetchOneHourData())
			dispatch(fetchOneMonthData())
			dispatch(fetchThreeMonthData())
		}
	}
}

export default connect(mapState, mapDispatch)(CandleStick)
