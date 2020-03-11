import React from "react";
import { KeyboardAvoidingView, Text, Button, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { View } from "native-base";

export default function SelectLevel({ navigation }) {
  const name = useSelector(state => state.player.name);
  const playWithDifficulty = (level, color, timer) => {
    navigation.navigate("Sudoku", { level, color, timer: timer * 60 });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text>Hello, {name}</Text>
      </View>
      <View style={styles.container}>
        <Text>Select the difficulty below and get to play</Text>
      </View>
      <View style={styles.levels}>
        <View style={styles.levelButton}>
          <Button
            title="Easy"
            color="green"
            onPress={() => playWithDifficulty("easy", "green", 30)}
          />
        </View>
        <View style={styles.levelButton}>
          <Button
            title="Medium"
            color="orange"
            onPress={() => playWithDifficulty("medium", "orange", 60)}
          />
        </View>
        <View style={styles.levelButton}>
          <Button
            title="Hard"
            color="red"
            onPress={() => playWithDifficulty("hard", "red", 120)}
          />
        </View>
        <View style={styles.levelButton}>
          <Button
            title="Random"
            onPress={() =>
              playWithDifficulty(
                "random",
                "blue",
                Math.floor(Math.random() * 120)
              )
            }
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  levels: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  levelButton: {
    marginStart: 5,
    marginEnd: 5
  }
});
