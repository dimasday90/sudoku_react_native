import { SET_PLAYER_NAME } from "../actionTypes";

const initialPlayer = {
  name: ""
};

export default function playerReducer(state = initialPlayer, action) {
  switch (action.type) {
    case SET_PLAYER_NAME:
      return { ...state, name: action.payload };
    default:
      return state;
  }
}
