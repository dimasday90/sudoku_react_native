import { SET_SUDOKU } from "../actionTypes";

export default function setSudoku(payload) {
  return {
    type: SET_SUDOKU,
    payload
  };
}
