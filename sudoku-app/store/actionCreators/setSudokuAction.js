import { SET_SUDOKU } from "../actionTypes";

export default function setSudoku(payload) {
  const newArr = [];
  payload.forEach(arr => {
    let inner = arr.slice();
    newArr.push(inner);
  });
  return {
    type: SET_SUDOKU,
    payload: newArr
  };
}
