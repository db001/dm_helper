import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Link } from "react-router-dom";

import "./Player.scss";

function Player(props) {
	return (
		<li>
			<div className="card">
				<div className="card-content">
					<span className="card-title">{props.data.character_name}</span>
					<p>{props.data.player_name}</p>
					<ul className="player_card-stats">
						<li>
							<p>Initiative</p>
							<p>{props.data.player_initiative}</p>
						</li>
						<li>
							<p>Dexterity</p>
							<p>{props.data.player_dex}</p>
						</li>
						<li>
							<p>Armour Class</p>
							<p>{props.data.player_armour_class}</p>
						</li>
						<li>
							<p>Hit Points</p>
							<p>{props.data.player_hit_points}</p>
						</li>
					</ul>
				</div>
				<div className="card-action">
					<Link to={`/player/${props.data.character_id}`}>Go to player</Link>
					{props.inCampaign ? (
						<button
							onClick={() => props.removePlayer(props.data.character_id, props.campaign_id)}
							className="btn btn-warning"
						>
							Remove from campaign
						</button>
					) : (
						<button
							onClick={() => props.addPlayer(props.data.character_id, props.campaign_id)}
							className="btn"
						>
							Add to campaign
						</button>
					)}
				</div>
			</div>
		</li>
	);
}

function mapStateToProps({ singleCampaign, players }) {
	return { singleCampaign, players };
}

export default connect(mapStateToProps, actions)(Player);
