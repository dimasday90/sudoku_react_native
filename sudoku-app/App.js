import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SudokuGamePage from "./views/SudokuGamePage";
import { Provider } from "react-redux";
import store from "./store";
import HomePage from "./views/HomePage";

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Sudoku" component={SudokuGamePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
