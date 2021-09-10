import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Link } from "react-router-dom";

class Dashboard extends Component {
	renderContent() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return;
			default:
				return (
					<ul>
						<li>
							<Link to="/campaigns">My Campaigns</Link>
						</li>
						<li>
							<Link to="/players">My Players</Link>
						</li>
					</ul>
				);
		}
	}

	render() {
		return (
			<div className="row">
				<div className="col">
					<h1>Dashboard</h1>
					{this.renderContent()}
				</div>
			</div>
		);
	}
}

function mapStateToProps({ data }) {
	return { data };
}

export default connect(mapStateToProps, actions)(Dashboard);
