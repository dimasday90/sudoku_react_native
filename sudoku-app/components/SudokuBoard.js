import React, { useEffect } from "react";
import { StyleSheet, TextInput, View, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import randomSudoku from "../store/actionCreators/randomSudokuAction";
import setSudoku from "../store/actionCreators/setSudokuAction";

export default function App() {
  const dispatch = useDispatch();
  const sudokuBoard = useSelector(state => state.sudoku.sudokuBoard);

  const handleChangeNumber = (value, indexRow, indexCol) => {
    sudokuBoard[indexRow][indexCol] = +value;
    dispatch(setSudoku(sudokuBoard));
  };

  //   const checkSudoku = (payload) => {

  //   }

  useEffect(() => {
    dispatch(randomSudoku());
  }, [dispatch]);
  return (
    <View>
      {sudokuBoard.map((row, indexRow) => (
        <View style={styles.row} key={indexRow}>
          {row.map((col, indexCol) => (
            <View key={indexCol}>
              <TextInput
                style={styles.col}
                maxLength={1}
                keyboardType="number-pad"
                defaultValue={col ? col.toString() : ""}
                onChangeText={text =>
                  handleChangeNumber(text, indexRow, indexCol)
                }
              />
            </View>
          ))}
        </View>
      ))}
      {/* <View>
        <Button title="Apply" onPress={} />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  col: {
    borderRightWidth: 1,
    borderLeftWidth: 1,
    width: 30,
    height: 30,
    textAlign: "center",
    textAlignVertical: "center"
  }
});
