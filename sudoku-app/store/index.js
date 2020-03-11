import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import player from "./reducers/player";
import loading from "./reducers/loading";
import initialSudoku from "./reducers/initialSudoku";
import sudoku from "./reducers/sudoku";
import message from "./reducers/message";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const allReducer = combineReducers({
  player,
  loading,
  initialSudoku,
  sudoku,
  message
});

const store = createStore(allReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
