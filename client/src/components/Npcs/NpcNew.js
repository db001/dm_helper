import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import axios from "axios";
import { Redirect } from "react-router";

// import './Player.scss'

class NpcNew extends Component {
	constructor(props) {
		super(props);

		this.state = {
			playerName: "",
			initiative: "",
			dex: "",
			armourClass: "",
			hitPoints: "",
		};
	}

	updatePlayerName = (value) => {
		this.setState({
			playerName: value,
			redirect: false,
		});
	};

	handleInputChange = (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});
	};

	onSubmitForm = async (e) => {
		e.preventDefault();
		const data = {
			name: this.state.playerName,
			initiative: Number(this.state.initiative),
			dex: Number(this.state.dex),
			armourClass: Number(this.state.armourClass),
			hitPoints: Number(this.state.hitPoints),
		};
		try {
			const response = await axios({
				method: "POST",
				url: "/api/players/add",
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

	render() {
		const { redirect } = this.state;

		if (redirect) {
			return <Redirect to="/players" />;
		}
		return (
			<Fragment>
				<div className="row">
					<div className="col">
						<div className="form">
							<h1>Add NPC</h1>
							<form onSubmit={this.onSubmitForm}>
								<div className="input-field">
									<input
										className="validate"
										id="playerName"
										name="playerName"
										type="text"
										placeholder=""
										value={this.state.playerName}
										onChange={(e) => this.updatePlayerName(e.target.value)}
									/>
									<label>NPC Name</label>
								</div>
								<div className="input-field">
									<label>Initiative</label>
									<input
										className="validate"
										id="initiative"
										name="initiative"
										type="Number"
										placeholder=""
										value={this.state.initiative}
										onChange={this.handleInputChange}
									/>
								</div>
								<div className="input-field">
									<label>Dexterity</label>
									<input
										className="validate"
										id="dex"
										name="dex"
										type="Number"
										placeholder=""
										value={this.state.dex}
										onChange={this.handleInputChange}
									/>
								</div>
								<div className="input-field">
									<label>Armour class</label>
									<input
										className="validate"
										id="armourClass"
										name="armourClass"
										type="Number"
										placeholder=""
										value={this.state.armourClass}
										onChange={this.handleInputChange}
									/>
								</div>
								<div className="input-field">
									<label>Hit Points</label>
									<input
										className="validate"
										id="hitPoints"
										name="hitPoints"
										type="Number"
										placeholder=""
										value={this.state.hitPoints}
										onChange={this.handleInputChange}
									/>
								</div>
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

export default connect(mapStateToProps, actions)(NpcNew);
