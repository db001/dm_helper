import axios from "axios";
import {
	FETCH_USER,
	GET_CAMPAIGNS,
	FETCH_SINGLE_CAMPAIGN,
	GET_PLAYERS,
	FETCH_CAMPAIGN_PLAYERS,
	FETCH_CAMPAIGN_NPCS,
	GET_NPCS,
} from "./types";

export const fetchUser = () => async (dispatch) => {
	const res = await axios.get("/api/current_user");
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async (dispatch) => {
	const res = await axios.post("/api/stripe", token);
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchCampaigns = () => async (dispatch) => {
	const res = await axios.get("/api/campaigns");
	dispatch({ type: GET_CAMPAIGNS, payload: res.data });
};

export const fetchSingleCampaign = (id) => async (dispatch) => {
	const res = await axios.get("/api/campaigns/fetch/" + id);
	dispatch({ type: FETCH_SINGLE_CAMPAIGN, payload: res.data });
};

export const fetchPlayers = () => async (dispatch) => {
	const res = await axios.get("/api/players");
	dispatch({ type: GET_PLAYERS, payload: res.data });
};

export const fetchCampaignPlayers = (id) => async (dispatch) => {
	const res = await axios.get("/api/players/campaign/" + id);
	dispatch({ type: FETCH_CAMPAIGN_PLAYERS, payload: res.data });
};

export const fetchNpcs = () => async (dispatch) => {
	const res = await axios.get("/api/npcs");
	dispatch({ type: GET_NPCS, payload: res.data });
};

export const fetchCampaignNpcs = (id) => async (dispatch) => {
	const res = await axios.get("/api/npcs/campaign/" + id);
	dispatch({ type: FETCH_CAMPAIGN_NPCS, payload: res.data });
};
