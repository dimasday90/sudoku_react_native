import { SET_INITIAL_SUDOKU } from "../actionTypes";

const initialState = {
  initialSudokuBoard: []
};

export default function intialSudokuReducer(state = initialState, action) {
  switch (action.type) {
    case SET_INITIAL_SUDOKU:
      return { ...state, initialSudokuBoard: action.payload };
    default:
      return state;
  }
}
