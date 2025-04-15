import { applyMiddleware, compose, createStore } from "redux";
import { thunk } from "redux-thunk";
import { RootReducer } from "./src/services/rootreducer/RootReducer";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(RootReducer, composeEnhancers(applyMiddleware(thunk)));