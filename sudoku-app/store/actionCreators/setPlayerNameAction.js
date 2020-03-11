import { SET_PLAYER_NAME } from "../actionTypes";

export default function setPlayerName(payload) {
  return {
    type: SET_PLAYER_NAME,
    payload
  };
}
