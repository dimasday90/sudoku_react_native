import { SET_SUDOKU, SET_INITIAL_SUDOKU } from "../actionTypes";

const initialState = {
  initialSudokuBoard: [],
  sudokuBoard: []
};

export default function sudokuReducer(state = initialState, action) {
  switch (action.type) {
    case SET_INITIAL_SUDOKU:
      return { ...state, initialSudokuBoard: action.payload };
    case SET_SUDOKU:
      return { ...state, sudokuBoard: action.payload };
    default:
      return state;
  }
}
