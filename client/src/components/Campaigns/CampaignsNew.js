import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import axios from "axios";
import { Redirect } from "react-router";

class CampaignsNew extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			error: false,
		};
	}

	updateName = (value) => {
		this.setState({
			name: value,
			redirect: false,
			error: false,
		});
	};

	onSubmitForm = async (e) => {
		e.preventDefault();
		if (!this.state.name) {
			this.setState({
				error: true,
			});
			console.log(this.state.error);
			return;
		}
		const data = {
			name: this.state.name,
		};
		try {
			const response = await axios({
				method: "POST",
				url: "/api/campaigns/add",
				headers: {
					"Content-type": "application/json",
				},
				data,
			});

			if (response) {
				this.setState({
					redirect: true,
				});
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	showError = () => {
		if (this.state.error) {
			return (
				<span className="error-msg">Please enter a campaign name</span>
			);
		}
	};

	render() {
		const { redirect } = this.state;

		if (redirect) {
			return <Redirect to="/campaigns" />;
		}
		return (
			<Fragment>
				<div className="row">
					<div className="col">
						<div className="form">
							<h1>Add Campaign</h1>
							<form onSubmit={this.onSubmitForm}>
								<input
									type="text"
									placeholder="Campaign Name"
									value={this.state.name}
									onChange={(e) =>
										this.updateName(e.target.value)
									}
								/>
								{this.state.error && (
									<p className="msg msg-error">
										Please enter a campaign name
									</p>
								)}
								<button className="btn" type="submit">
									Add
								</button>
							</form>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps, actions)(CampaignsNew);
