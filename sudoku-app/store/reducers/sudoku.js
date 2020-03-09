import { SET_SUDOKU } from "../actionTypes";

const initialState = {
  sudokuBoard: []
};

export default function sudokuReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SUDOKU:
      return { ...state, sudokuBoard: action.payload };
    default:
      return state;
  }
}
