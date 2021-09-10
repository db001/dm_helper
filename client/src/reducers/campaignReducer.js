import { GET_CAMPAIGNS, FETCH_SINGLE_CAMPAIGN } from "../actions/types";
import { isEmpty } from "../utils";

export const campaignReducer = (state = null, action) => {
	switch (action.type) {
		case GET_CAMPAIGNS:
			return isEmpty(action.payload) ? false : action.payload;

		default:
			return state;
	}
};

export const singleCampaignReducer = (state = null, action) => {
	switch (action.type) {
		case FETCH_SINGLE_CAMPAIGN:
			return isEmpty(action.payload) ? false : action.payload;

		default:
			return state;
	}
};
