import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  TouchableOpacity,
  Alert
} from "react-native";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import fetchSudoku from "../store/actionCreators/fetchSudokuAction";
import setSudoku from "../store/actionCreators/setSudokuAction";
import checkSudoku from "../store/actionCreators/checkSudokuAction";
import autoSolveSudoku from "../store/actionCreators/autoSolveSudokuAction";

export default function App() {
  const initialSudokuBoard = useSelector(
    state => state.initialSudoku.initialSudokuBoard
  );
  const sudokuBoard = useSelector(state => state.sudoku.sudokuBoard);
  const message = useSelector(state => state.message.message);
  const loading = useSelector(state => state.loading.loading);
  const [dialog, setDialog] = useState(false);
  const [indexRow, setIndexRow] = useState(null);
  const [indexCol, setIndexCol] = useState(null);
  const dispatch = useDispatch();

  const openValueChangeDialog = (event, indexRow, indexCol) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setIndexRow(indexRow);
      setIndexCol(indexCol);
      setDialog(true);
    }
  };

  const closeValueChangeDialog = event => {
    setDialog(false);
  };

  const handleChangeNumber = value => {
    sudokuBoard[indexRow][indexCol] = +value;
    dispatch(setSudoku(sudokuBoard));
    setIndexRow(null);
    setIndexCol(null);
    closeValueChangeDialog();
  };

  const applySudokuValidate = () => {
    dispatch(checkSudoku(sudokuBoard));
    if (message) {
      Alert.alert(
        `Sudoku ${message}`,
        "",
        [
          {
            text: "Ok",
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
    }
  };

  const solveSudoku = () => {
    Alert.alert(
      "Solve Sudoku",
      "Are you sure to solve your sudoku?\n(Your access button will be disable and any changes will not be occured after auto solve)",
      [
        {
          text: "No",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => {
            dispatch(autoSolveSudoku(initialSudokuBoard));
            if (message === "solved") {
              Alert.alert(
                "Sudoku Solved Automatically",
                "You can try solving sudoku on your own again next time. For now, you can see the solved sudoku and back to home to try again.",
                [
                  {
                    text: "Ok",
                    style: "cancel"
                  }
                ],
                { cancelable: false }
              );
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  const resetBoard = () => {
    Alert.alert(
      "Reset Sudoku",
      "Are you sure to reset your sudoku back to original sudoku state?",
      [
        {
          text: "No",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => {
            dispatch(setSudoku(initialSudokuBoard));
          }
        }
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    dispatch(fetchSudoku());
  }, []);

  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  return (
    <View>
      {message !== "solved" && (
        <View>
          <Text>Tap the box twice to change the number</Text>
        </View>
      )}
      {message === "solved" && (
        <View>
          <Text>This sudoku has been solved</Text>
        </View>
      )}
      <View>
        {sudokuBoard.map((row, indexRow) => (
          <View
            style={
              indexRow == sudokuBoard.length - 1 ? styles.rowBottom : styles.row
            }
            key={indexRow}
          >
            {row.map((col, indexCol) => (
              <View
                key={indexCol}
                style={
                  indexCol === row.length - 1
                    ? styles.buttonRight
                    : styles.button
                }
              >
                <TapGestureHandler
                  numberOfTaps={2}
                  enabled={message === "solved" ? false : true}
                  onHandlerStateChange={event =>
                    openValueChangeDialog(event, indexRow, indexCol)
                  }
                >
                  <Text style={styles.buttonText}> {col.toString()} </Text>
                </TapGestureHandler>
              </View>
            ))}
          </View>
        ))}
      </View>
      <View>
        <Modal visible={dialog} animationType="slide" transparent={true}>
          <View style={styles.dialog}>
            {Array.from(new Array(9)).map((item, i) => (
              <TouchableOpacity
                key={i}
                style={styles.buttonDialog}
                onPress={() => handleChangeNumber(Number(i + 1))}
              >
                <Text style={styles.textDialog}>{i + 1}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
      </View>
      {!dialog && message !== "solved" && (
        <View
          style={{
            marginTop: 9,
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <View>
            <Button title="Submit" onPress={applySudokuValidate} />
          </View>
          <View>
            <Button title="Solve" color="green" onPress={solveSudoku} />
          </View>
          <View>
            <Button title="Reset" color="grey" onPress={resetBoard} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderTopWidth: 1
  },
  rowBottom: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  button: {
    alignItems: "center",
    padding: 10,
    borderLeftWidth: 1
  },
  buttonText: {
    fontSize: 20
  },
  buttonDialog: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "green"
  },
  textDialog: {
    fontSize: 20,
    color: "white"
  },
  buttonRight: {
    alignItems: "center",
    padding: 10,
    borderLeftWidth: 1,
    borderRightWidth: 1
  },
  dialog: {
    flexDirection: "row",
    marginTop: 550,
    justifyContent: "space-evenly"
  }
});
