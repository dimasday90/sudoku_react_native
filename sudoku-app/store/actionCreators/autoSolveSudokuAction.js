import axios from "axios";
import setMessage from "./setMessageAction";
import setSudoku from "./setSudokuAction";
import setLoading from "./setLoadingAction";

export default function autoSolveSudoku(payload) {
  const encodeBoard = board =>
    board.reduce(
      (result, row, i) =>
        result +
        `%5B${encodeURIComponent(row)}%5D${
          i === board.length - 1 ? "" : "%2C"
        }`,
      ""
    );

  const encodeParams = params =>
    Object.keys(params)
      .map(key => key + "=" + `%5B${encodeBoard(params[key])}%5D`)
      .join("&");
  return function(dispatch) {
    dispatch(setLoading(true));
    axios
      .post(
        "https://sugoku.herokuapp.com/solve",
        encodeParams({ board: payload }),
        { "Content-Type": "application/x-www-form-urlencoded" }
      )
      .then(({ data }) => {
        dispatch(setSudoku(data.solution));
        dispatch(setMessage(data.status));
      })
      .catch(err => {
        dispatch(setMessage(err));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}
