import React, { useState } from "react";
import HomePage from "./Components/HomePage";
import LoginPage from "./Components/LoginPage";
import "../src/Style/App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignInPage from "./Components/SignInPage";
import SignUpPage from "./Components/SignUpPage";
import Profile from "./Components/Profile";
import FilmProfile from "./Components/FilmProfile";
import { Context } from "../src/context";
import LikedFilm from "./Components/FavoriteFilm";
import People from "./Components/People";

function App() {
  const [film, setFilm] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [movies, setMovies] = useState([]);

  return (
    <BrowserRouter>
      <Context.Provider
        value={
          {
            film,
            setFilm,
            favorite,
            setFavorite,
            movies, 
            setMovies
          }
        }
      >
        <div className="app">
          <Switch>
            <Route path="/signup" component={SignUpPage} />
            <Route path="/login" component={SignInPage} />
            <Route path="/homepage" component={HomePage} />
            <Route path="/profile" component={Profile} />
            <Route path="/filmprofile/:id" component={FilmProfile} />
            <Route path="/liked" component={LikedFilm} />
            <Route path="/people" component={People} />
            <Route path="/" component={LoginPage} />
          </Switch>
        </div>
      </Context.Provider>
    </BrowserRouter>
  );
}

export default App;
