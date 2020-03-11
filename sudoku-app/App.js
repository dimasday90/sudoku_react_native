import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import store from "./store";
import HomePage from "./views/HomePage";
import SelectLevelPage from "./views/SelectLevelPage";
import SudokuGamePage from "./views/SudokuGamePage";
import ErrorBoundary from "./ErrorBoundary";

console.disableYellowBox = true;

const Stack = createStackNavigator();

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomePage}
              options={{ title: "Home" }}
            />
            <Stack.Screen
              name="SelectLevel"
              component={SelectLevelPage}
              options={{ title: "Select Level" }}
            />
            <Stack.Screen name="Sudoku" component={SudokuGamePage} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
