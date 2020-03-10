import { SET_INITIAL_SUDOKU } from "../actionTypes";

export default function setInitialSudoku(payload) {
  return {
    type: SET_INITIAL_SUDOKU,
    payload
  };
}
