import { combineReducers } from "redux";
import { cinemas } from "./cinemas";
import { seances } from "./seances";
import { movies } from "./movies";
import { auth } from "./auth";

export const rootReducer = combineReducers({
    cinemas: cinemas,
    seances: seances,
    movies: movies,
    auth: auth
});