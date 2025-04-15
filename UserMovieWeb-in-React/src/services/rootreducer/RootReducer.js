import { combineReducers } from "redux";
import { AuthReducer } from "../reducers/AuthReducer";
import { MovieReducer } from "../reducers/MovieUserReducer";

export const RootReducer = combineReducers({
    MovieReducer,
    AuthReducer,
})