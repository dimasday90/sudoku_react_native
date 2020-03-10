import { SET_MESSAGE } from "../actionTypes";

export default function setMessage(payload) {
  return {
    type: SET_MESSAGE,
    payload
  };
}
