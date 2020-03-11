import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import fetchSudoku from "../store/actionCreators/fetchSudokuAction";
import setSudoku from "../store/actionCreators/setSudokuAction";
import checkSudoku from "../store/actionCreators/checkSudokuAction";
import autoSolveSudoku from "../store/actionCreators/autoSolveSudokuAction";
import setLoading from "../store/actionCreators/setLoadingAction";
import setMessage from "../store/actionCreators/setMessageAction";
import CountDown from "react-native-countdown-component";

export default function SudokuComponent({ route, navigation }) {
  const initialSudokuBoard = useSelector(
    state => state.initialSudoku.initialSudokuBoard
  );
  const sudokuBoard = useSelector(state => state.sudoku.sudokuBoard);
  const message = useSelector(state => state.message.message);
  const loading = useSelector(state => state.loading.loading);
  const [dialog, setDialog] = useState(false);
  const [alert, setAlert] = useState(false);
  const [iRow, setIRow] = useState(null);
  const [iCol, setICol] = useState(null);
  const dispatch = useDispatch();
  const { level, color, timer } = route.params;

  const openValueChangeDialog = (event, indexRow, indexCol) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setIRow(indexRow);
      setICol(indexCol);
      setDialog(true);
    }
  };

  const closeValueChangeDialog = event => {
    setDialog(false);
  };

  const handleChangeNumber = value => {
    sudokuBoard[iRow][iCol] = +value;
    dispatch(setSudoku(sudokuBoard));
    setIRow(null);
    setICol(null);
    closeValueChangeDialog();
  };

  const applySudokuValidate = () => {
    setAlert(true);
    dispatch(checkSudoku(sudokuBoard))
      .then(({ data }) => {
        dispatch(setMessage(data.status));
        if (!loading && data.status) {
          if (data.status === "solved") {
            Alert.alert(
              `Sudoku ${data.status}`,
              "WOW, Good job!! (#^_^#)",
              [
                {
                  text: "Stay Here",
                  style: "cancel"
                },
                {
                  text: "Back To Select Level",
                  onPress: () => {
                    navigation.goBack();
                  }
                }
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert(
              `Sudoku ${data.status}`,
              "Find and fix the inccorect input number.",
              [
                {
                  text: "Ok",
                  onPress: () => {
                    setAlert(false);
                  }
                }
              ],
              { cancelable: false }
            );
          }
        }
      })
      .catch(err => {
        dispatch(setMessage(err));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const solveSudoku = () => {
    setAlert(true);
    Alert.alert(
      "Solve Sudoku",
      "Are you sure to solve your sudoku?\n(Your access button will be disable and any changes will not be occured after auto solve)",
      [
        {
          text: "No",
          style: "cancel",
          onPress: () => {
            setAlert(false);
          }
        },
        {
          text: "Yes",
          onPress: () => {
            setAlert(false);
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
    setAlert(true);
    Alert.alert(
      "Reset Sudoku",
      "Are you sure to reset your sudoku back to original sudoku state?",
      [
        {
          text: "No",
          style: "cancel",
          onPress: () => {
            setAlert(false);
          }
        },
        {
          text: "Yes",
          onPress: () => {
            setAlert(false);
            dispatch(setSudoku(initialSudokuBoard));
          }
        }
      ],
      { cancelable: false }
    );
  };

  const timeUp = () => {
    Alert.alert(
      "Your Times is Up",
      "Be better and try again next time (>_<)",
      [
        {
          text: "Back To Select Level",
          onPress: () => {
            navigation.goBack();
          }
        }
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    dispatch(fetchSudoku(level));
  }, []);

  return (
    <View style={message !== "solved" ? { flex: 1 } : {}}>
      {message !== "solved" && (
        <CountDown
          size={20}
          until={timer}
          onFinish={() => timeUp()}
          digitStyle={{
            backgroundColor: "#FFF",
            borderWidth: 2,
            borderColor: color
          }}
          digitTxtStyle={{ color: color }}
          timeLabelStyle={{ color: "black", fontWeight: "bold" }}
          timeToShow={["H", "M", "S"]}
          timeLabels={{ h: "hour", m: "minute", s: "second" }}
          running={loading || alert ? false : true}
          style={{ marginTop: 10 }}
        />
      )}
      {loading && <ActivityIndicator size="large" color={color} />}
      {!loading && (
        <View>
          {message !== "solved" && !dialog && (
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
                  indexRow == sudokuBoard.length - 1
                    ? styles.rowBottom
                    : styles.row
                }
                key={indexRow}
              >
                {row.map((col, indexCol) => (
                  <TapGestureHandler
                    key={indexCol}
                    numberOfTaps={2}
                    enabled={
                      message === "solved" ||
                      (initialSudokuBoard[indexRow][indexCol] ===
                        sudokuBoard[indexRow][indexCol] &&
                        col !== 0)
                        ? false
                        : true
                    }
                    onHandlerStateChange={event =>
                      openValueChangeDialog(event, indexRow, indexCol)
                    }
                  >
                    <View
                      style={
                        indexRow === iRow && indexCol === iCol
                          ? initialSudokuBoard[indexRow][indexCol] ===
                              sudokuBoard[indexRow][indexCol] && col !== 0
                            ? [
                                styles.lockedButton,
                                styles.selectedButton,
                                styles.button
                              ]
                            : [styles.selectedButton, styles.button]
                          : initialSudokuBoard[indexRow][indexCol] ===
                              sudokuBoard[indexRow][indexCol] && col !== 0
                          ? [styles.lockedButton, styles.button]
                          : styles.button
                      }
                    >
                      <Text style={styles.buttonText}> {col.toString()} </Text>
                    </View>
                  </TapGestureHandler>
                ))}
              </View>
            ))}
            {message !== "solved" && dialog && (
              <View style={{ marginTop: 19 }}>
                <Text>Choose the number below</Text>
              </View>
            )}
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
  selectedButton: {
    backgroundColor: "lightblue"
  },
  buttonText: {
    fontSize: 20
  },
  buttonDialog: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "lightblue"
  },
  textDialog: {
    fontSize: 20,
    color: "white"
  },
  button: {
    alignItems: "center",
    padding: 10,
    borderLeftWidth: 1,
    borderRightWidth: 1
  },
  dialog: {
    flexDirection: "row",
    marginTop: 650,
    justifyContent: "space-evenly"
  },
  lockedButton: {
    backgroundColor: "grey"
  }
});
