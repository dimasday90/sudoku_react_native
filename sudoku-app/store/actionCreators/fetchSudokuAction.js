import axios from "axios";
import setSudoku from "./setSudokuAction";
import setInitialSudoku from "./setInitialSudokuAction";
import setLoading from "./setLoadingAction";

export default function randomSudoku() {
  return function(dispatch) {
    dispatch(setLoading(true));
    axios
      .get("https://sugoku.herokuapp.com/board?difficulty=random")
      .then(({ data }) => {
        dispatch(setInitialSudoku(data.board));
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
