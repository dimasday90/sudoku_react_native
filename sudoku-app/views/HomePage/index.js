import React, { useState } from "react";
import { KeyboardAvoidingView, Text, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function Home({ navigation }) {
  const [name, setName] = useState("");

  const submitName = () => {
    navigation.navigate("Sudoku");
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Text>Welcome To Sudoku Day</Text>

      <Text>Before play, please input your name below</Text>
      <TextInput
        style={{
          height: 40,
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
          padding: 12
        }}
        onChangeText={text => setName(text)}
      />
      <Button title="Go to Sudoku" onPress={() => submitName()} />
    </KeyboardAvoidingView>
  );
}
