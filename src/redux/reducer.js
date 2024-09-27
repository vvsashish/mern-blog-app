import { combineReducers } from "redux";
import { SET_SUBSCRIPTION_STATUS } from "./actions";

const initialState = {
  isSubscribed: false,
};

const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUBSCRIPTION_STATUS:
      console.log("Reducer setting subscription status:", action.payload);
      return { ...state, isSubscribed: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  subscription: subscriptionReducer,
});
