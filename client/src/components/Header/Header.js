import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./Header.scss";

class Header extends Component {
	renderContent() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return (
					<li>
						<a href="/auth/google">Login with Google</a>
					</li>
				);
			default:
				return [
					<li key="campaigns">
						<Link to="/campaigns">Campaigns</Link>
					</li>,
					<li key="players">
						<Link to="/players">Players</Link>
					</li>,
					<li key="head2">
						<a href="/api/logout" className="btn-small">
							Logout
						</a>
					</li>,
				];
		}
	}

	render() {
		const userName = this.props.auth ? this.props.auth.user.user_name : "";

		return (
			<nav className="container-fluid">
				<div className="nav-wrapper">
					<Link
						to={this.props.auth ? "/dashboard" : "/"}
						href="/"
						className="logo"
					>
						<h3>
							{this.props.auth
								? `${userName}'s DM Helper`
								: `DM Helper`}
						</h3>
					</Link>
					<ul id="nav-mobile">{this.renderContent()}</ul>
				</div>
			</nav>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Header);
