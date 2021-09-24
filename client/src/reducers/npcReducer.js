import { GET_NPCS, FETCH_CAMPAIGN_NPCS } from "../actions/types";
import { isEmpty } from "../utils";

export const npcReducer = (state = null, action) => {
	switch (action.type) {
		case GET_NPCS:
			return isEmpty(action.payload) ? false : action.payload;

		default:
			return state;
	}
};

export const campaignNpcsReducer = (state = null, action) => {
	switch (action.type) {
		case FETCH_CAMPAIGN_NPCS: {
			return isEmpty(action.payload) ? false : action.payload;
		}

		default:
			return state;
	}
};
