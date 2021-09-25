import React, { useEffect, useState, useMemo } from "react";
import HomePage from "./Components/HomePage";
import LoginPage from "./Components/LoginPage";
import "../src/Style/App.css";
import axios from "axios";
import { BrowserRouter, Route } from "react-router-dom";
import SignInPage from "./Components/SignInPage";
import SignUpPage from "./Components/SignUpPage";
import Profile from "./Components/Profile";
import FilmProfile from "./Components/FilmProfile";
import { Context } from "../src/context";
import LikedFilm from "./Components/LikedFilm";
import requests from "./Request";

function App() {
  const [film, setFilm] = useState([]);
  const [liked, setLiked] = useState([]);

  const [movies, setMovies] = useState([]);
	// yura dura
  // const [sortedByGenres, setSortedByGenres] = useState([]);
  // const [listToShow, setListToShow] = useState([]);
  // const [search, setSearch] = useState("");
  // const [query, setQuery] = useState("");

  // const sorted and filtered data = useMemo(()=>{
  // return initialState.filter(({name}=> search be search)).filter(({genre})=> genre===sortValue)
  // }, [initialStart, search, sortValue])

  return (
    <BrowserRouter>
      <Context.Provider
        value={
          {
            film,
            setFilm,
            liked,
            setLiked,
            // query,
            // setQuery,
            // sortedByGenres,
            // setSortedByGenres,
            // listToShow,
            // setListToShow,
            movies, 
            setMovies
          }
        }
      >
        <div className="app">
          <Route path="/start" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/login" component={SignInPage} />
          <Route path="/homepage" component={HomePage} />
          <Route path="/profile" component={Profile} />
          <Route path="/filmprofile/:id" component={FilmProfile} />
          <Route path="/liked" component={LikedFilm} />
        </div>
      </Context.Provider>
    </BrowserRouter>
  );
}

export default App;
