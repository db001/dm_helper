import { GET_PLAYERS, FETCH_CAMPAIGN_PLAYERS } from "../actions/types";
import { isEmpty } from "../utils";

export const playersReducer = (state = null, action) => {
	switch (action.type) {
		case GET_PLAYERS:
			return isEmpty(action.payload) ? false : action.payload;

		default:
			return state;
	}
};

export const campaignPlayersReducer = (state = null, action) => {
	switch (action.type) {
		case FETCH_CAMPAIGN_PLAYERS: {
			return isEmpty(action.payload) ? false : action.payload;
		}

		default:
			return state;
	}
};
