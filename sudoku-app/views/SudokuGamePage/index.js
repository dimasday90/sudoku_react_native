import React from "react";
import { StyleSheet, View } from "react-native";
import SudokuComponent from "../../components/SudokuComponent";

export default function SudokuGamePage({ route, navigation }) {
  return (
    <View style={styles.container}>
      <SudokuComponent route={route} navigation={navigation} />
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
