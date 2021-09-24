import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header/Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import CampaignsList from "./Campaigns/CampaignsList";
import CampaignsNew from "./Campaigns/CampaignsNew";
import CampaignDetails from "./Campaigns/CampaignDetails";
import PlayersList from "./Players/PlayersList";
import PlayersNew from "./Players/PlayersNew";
import NpcList from "./Npcs/NpcList";
import NpcNew from "./Npcs/NpcNew";

import "./App.scss";

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<div>
				<BrowserRouter>
					<div>
						<Header />
						<div className="container-fluid">
							<Route exact path="/" component={Landing} />
							<Route exact path="/dashboard" component={Dashboard} />
							<Route exact path="/campaigns" component={CampaignsList} />
							<Route exact path="/campaigns/new" component={CampaignsNew} />
							<Route path="/campaigns/details/:id" component={CampaignDetails} />
							<Route exact path="/players" component={PlayersList} />
							<Route exact path="/players/new" component={PlayersNew} />
							<Route exact path="/npcs" component={NpcList} />
							<Route exact path="/npcs/new" component={NpcNew} />
						</div>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps, actions)(App);
