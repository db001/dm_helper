import { FETCH_USER } from "../actions/types";
import { isEmpty } from "../utils";

const authReducer = (state = null, action) => {
	switch (action.type) {
		case FETCH_USER:
			// return action.payload || false;
			return isEmpty(action.payload) ? false : action.payload;

		default:
			return state;
	}
};

export default authReducer;
