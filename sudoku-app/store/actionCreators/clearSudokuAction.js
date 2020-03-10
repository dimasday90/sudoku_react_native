import axios from "axios";
import setSudoku from "./setSudokuAction";
import setLoading from "./setLoadingAction";

export default function clearSudoku() {
  return function(dispatch) {
    dispatch(setLoading(true));
    axios
      .get("https://sugoku.herokuapp.com/board")
      .then(({ data }) => {
        dispatch(setSudoku(data.board));
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}
