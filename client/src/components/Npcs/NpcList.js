import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import axios from "axios";
import { Link } from "react-router-dom";

import Npc from "./Npc";

class NpcList extends Component {
	componentDidMount() {
		this.props.fetchPlayers();
	}

	// deletePlayer = async (id) => {
	// 	try {
	// 		const response = await axios.delete(`/api/players/delete/${id}`);
	// 		console.log(response.data);
	// 		this.props.fetchPlayers();
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	renderNpcs = () => {
		return <li key="noPlayers">You haven't created any players, start by clicking the link above</li>;
		// if (!this.props.players) {
		// 	return <li key="noPlayers">You haven't created any players, start by clicking the link above</li>;
		// }
		// const myPlayers = this.props.players.map((player) => {
		// 	return <Npc key={player.character_id} data={player} deletePlayer={this.deletePlayer} />;
		// });

		// return myPlayers;
	};

	render() {
		return (
			<div className="row">
				<div className="col">
					<h1>NPCs</h1>
					<Link to="/npcs/new" className="btn-small">
						Add an NPC
					</Link>
					<ul>{this.renderNpcs()}</ul>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ players }) {
	return { players };
}

export default connect(mapStateToProps, actions)(NpcList);
