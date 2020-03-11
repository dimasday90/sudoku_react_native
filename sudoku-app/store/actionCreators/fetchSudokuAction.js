import axios from "axios";
import setSudoku from "./setSudokuAction";
import setInitialSudoku from "./setInitialSudokuAction";
import setLoading from "./setLoadingAction";
import setMessage from "./setMessageAction";

export default function fetchSudoku(level) {
  return function(dispatch) {
    dispatch(setLoading(true));
    dispatch(setMessage(""));
    axios
      .get(`https://sugoku.herokuapp.com/board?difficulty=${level}`)
      .then(({ data }) => {
        const initSudoku = [];
        data.board.forEach(arr => {
          const deepInit = arr.slice();
          initSudoku.push(deepInit);
        });
        dispatch(setInitialSudoku(initSudoku));
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
