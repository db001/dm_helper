import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import axios from "axios";
import { Link } from "react-router-dom";

import Player from "./Player";

class PlayersList extends Component {
	componentDidMount() {
		this.props.fetchPlayers();
	}

	deletePlayer = async (id) => {
		try {
			const response = await axios.delete(`/api/players/delete/${id}`);
			console.log(response.data);
			this.props.fetchPlayers();
		} catch (error) {
			console.log(error);
		}
	};

	renderPlayers = () => {
		if (!this.props.players) {
			return <li key="noPlayers">You haven't created any players, start by clicking the link above</li>;
		}
		const myPlayers = this.props.players.map((player) => {
			return <Player key={player.character_id} data={player} deletePlayer={this.deletePlayer} />;
		});

		return myPlayers;
	};

	render() {
		return (
			<div className="row">
				<div className="col">
					<h1>Player Characters</h1>
					<Link to="/players/new">Add a player</Link>
					<ul>{this.renderPlayers()}</ul>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ players }) {
	return { players };
}

export default connect(mapStateToProps, actions)(PlayersList);
