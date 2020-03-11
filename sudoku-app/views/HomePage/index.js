import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  Button,
  StyleSheet,
  Alert
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import inputName from "../../store/actionCreators/setPlayerNameAction";
import { useDispatch } from "react-redux";

export default function Home({ navigation }) {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const submitName = () => {
    if (name.length) {
      dispatch(inputName(name));
      navigation.navigate("SelectLevel");
    } else {
      Alert.alert(
        "Invalid Name",
        "Please input your solid name",
        [
          {
            text: "Ok"
          }
        ],
        { cancelable: false }
      );
    }
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
      <Text style={styles.container}>Welcome To Sudoku Day</Text>

      <Text style={styles.container}>
        Before play, please input your name below
      </Text>
      <TextInput
        style={{
          height: 40,
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
          padding: 12,
          marginBottom: 10
        }}
        onChangeText={text => setName(text)}
      />
      <Button title="Go to Sudoku" onPress={() => submitName()} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center"
  }
});
