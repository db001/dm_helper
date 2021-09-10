import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import axios from "axios";

import PlayerCampaign from "../Players/PlayerCampaign";
import { Link } from "react-router-dom";

class CampaignDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {
			campaign_name: "",
			campaign_id: "",
			campaignPlayers: [],
			otherPlayers: [],
		};
	}

	componentDidMount() {
		this.getCampaignDetails();
	}

	async getCampaignDetails() {
		await this.props.fetchSingleCampaign(this.props.match.params.id);
		const campaign_name = this.props.singleCampaign ? this.props.singleCampaign.campaign_name : "";

		const campaign_id = this.props.singleCampaign ? this.props.singleCampaign.campaign_id : "";

		this.setState({
			campaign_name,
			campaign_id,
		});

		if (campaign_id) {
			this.fetchPlayersInCampaign(campaign_id);
			this.fetchOtherPlayers(campaign_id);
		}
	}

	async fetchPlayersInCampaign(id) {
		try {
			const res = await axios.get(`/api/players/campaign/${id}`);
			this.setState({
				campaignPlayers: res.data.players,
			});
		} catch (error) {
			console.error(error);
		}
	}

	async fetchOtherPlayers(id) {
		try {
			const res = await axios.get(`/api/players/nocampaign/${id}`);
			this.setState({
				otherPlayers: res.data.players,
			});
		} catch (error) {
			console.error(error);
		}
	}

	addToCampaign = async (player_id, campaign_id) => {
		const data = {
			player_id,
			campaign_id,
		};

		try {
			const response = await axios({
				method: "PUT",
				url: `/api/players/campaign/add/${player_id}`,
				headers: {
					"Content-type": "application/json",
				},
				data,
			});

			if (response) {
				this.fetchPlayersInCampaign(this.props.singleCampaign.campaign_id);
				this.fetchOtherPlayers(this.state.campaign_id);
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	async removePlayer(player_id, campaign_id) {
		const data = {
			campaign_id,
		};
		try {
			const response = await axios({
				method: "DELETE",
				url: `/api/players/campaign/remove/${player_id}`,
				headers: {
					"Content-type": "application/json",
				},
				data,
			});
			if (response) {
				window.location.reload(true);
			}
		} catch (error) {
			console.log(error);
		}
	}

	renderPlayers = () => {
		if (this.state.campaignPlayers && this.state.campaignPlayers.length > 0) {
			return (
				<div>
					<p>Players in this campaign</p>
					<ul>
						{this.state.campaignPlayers.map((player) => (
							<PlayerCampaign
								key={player.character_id}
								data={player}
								inCampaign={true}
								campaign_id={this.props.singleCampaign.campaign_id}
								removePlayer={this.removePlayer}
							/>
						))}
					</ul>
				</div>
			);
		} else {
			return (
				<div>
					<p>No players currently listed in this campaign</p>
					{/* <button className="btn" onClick={() => this.fetchOtherPlayers(this.state.campaign_id)}>
						Add Player
					</button> */}
				</div>
			);
		}
	};

	renderOtherPlayers() {
		if (this.state.otherPlayers.length > 0) {
			return (
				<div>
					<ul>
						{this.state.otherPlayers.map((player) => (
							<PlayerCampaign
								key={player.character_id}
								data={player}
								inCampaign={false}
								campaign_id={this.props.singleCampaign.campaign_id}
								addPlayer={() => this.addToCampaign(player.character_id, this.props.singleCampaign.campaign_id)}
							/>
						))}
					</ul>
				</div>
			);
		} else {
			return (
				<p>
					You don't have any players you can add,&nbsp;
					<Link to="/players/new">click here to add some players</Link>
				</p>
			);
		}
	}

	render() {
		return (
			<Fragment>
				<p>Campaign name:</p>
				{this.state.campaign_name ? <h2>{this.state.campaign_name}</h2> : <h2>Fetching campaign details</h2>}
				{this.renderPlayers()}
				<h4>Your other players</h4>
				{this.renderOtherPlayers()}
			</Fragment>
		);
	}
}

function mapStateToProps({ singleCampaign, players }) {
	return { singleCampaign, players };
}

export default connect(mapStateToProps, actions)(CampaignDetails);
