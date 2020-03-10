import React from "react";
import { StyleSheet, View } from "react-native";
import SudokuComponent from "../../components/SudokuComponent";
// import { Provider } from "react-redux";
// import store from "../../store";

export default function SudokuGamePage() {
  return (
    <View style={styles.container}>
      <SudokuComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
