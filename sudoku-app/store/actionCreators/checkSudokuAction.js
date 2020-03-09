import axios from "axios";

export default function randomSudoku(payload) {
  const encodeParams = params =>
    Object.keys(params)
      .map(key => key + "=" + `%5B${encodeBoard(params[key])}%5D`)
      .join("&");
  return function(dispatch) {
    axios
      .payload(
        "https://sugoku.herokuapp.com/board?difficulty=random",
        encodeParams({ board: payload })
      )
      .then(({ data }) => {
        dispatch(setSudoku(data.board));
      })
      .catch(err => {
        console.log(err);
      });
  };
}
