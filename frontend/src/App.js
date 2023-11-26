import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from "./pages/HomePage/HomePage";
import CinemaPage from "./pages/CinemaPage/CinemaPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import BuyTicketPage from "./pages/BuyTicketPage/BuyTicketPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

import store from "./store/store";

function App() {
    return (
        <Provider store={ store }>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={ <HomePage /> } />

                    <Route path="/login" element={ <SignInPage /> } />
                    <Route path="/reg" element={ <SignUpPage /> } />

                    <Route path="/cinema/:id" element={ <CinemaPage /> } />
                    <Route path="/movie/:id" element={ <MoviePage /> } />
                    <Route path="/buyTicket/:id" element={ <BuyTicketPage /> } />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
