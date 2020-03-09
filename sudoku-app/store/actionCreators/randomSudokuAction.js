import axios from "axios";
import setSudoku from "./setSudokuAction";

export default function randomSudoku() {
  return function(dispatch) {
    axios
      .get("https://sugoku.herokuapp.com/board?difficulty=random")
      .then(({ data }) => {
        dispatch(setSudoku(data.board));
      })
      .catch(err => {
        console.log(err);
      });
  };
}
