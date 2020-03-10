import { SET_MESSAGE } from "../actionTypes";

const initialState = {
  message: ""
};

export default function setMessage(state = initialState, action) {
  switch (action.type) {
    case SET_MESSAGE:
      return { ...state, message: action.payload };
    default:
      return state;
  }
}
