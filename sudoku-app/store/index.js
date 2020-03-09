import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import sudoku from "./reducers/sudoku";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const allReducer = combineReducers({
  sudoku
});

const store = createStore(allReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
