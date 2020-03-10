import { SET_MESSAGE } from "../actionTypes";

export default function setSudoku(payload) {
  return {
    type: SET_MESSAGE,
    payload
  };
}
