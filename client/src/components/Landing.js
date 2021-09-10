import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Landing extends Component {
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
					<h1>DM Helper</h1>
					<p>Your D&amp;D Dashboard</p>
					{this.renderContent()}
				</div>
			</div>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Landing);

// const Landing = () => {
// 	return (
// 		<div style={{ textAlign: "center" }}>
// 			<h1>DM Helper</h1>
// 			Your D&amp;D Dashboard
// 		</div>
// 	);
// };
// export default Landing;
