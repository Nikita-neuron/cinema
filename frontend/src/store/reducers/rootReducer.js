import { combineReducers } from "redux";
import { cinemas } from "./cinemas";
import { seances } from "./seances";
import { movies } from "./movies";
import { auth } from "./auth";
import { seats } from "./seats";
import { loader } from "./loader";
import { tickets } from "./tickets";
import { users } from "./users";

export const rootReducer = combineReducers({
    cinemas: cinemas,
    seances: seances,
    movies: movies,
    auth: auth,
    seats: seats,
    loader: loader,
    tickets: tickets,
    users: users
});