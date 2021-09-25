import React, { useContext, useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { Context } from "../context";
import "../Style/FilmProfile.css";

const FilmProfile = () => {
  const params = useParams();
  const { film, setFilm, liked, setLiked } = useContext(Context);
  let history = useHistory();
  const [toggle, setToggle] = useState(false);

  function truncate(string, n) {
    string = string?.replace("</p>", " ").replace("<p>", " ");
    string = string?.replace("<b>", " ").replace("</b>", " ");
    string = string?.replace("<i>", " ").replace("</i>", " ");
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  const backToHomepage = (event) => {
    event.preventDefault();
    history.push("/homepage");
  };

  useEffect(() => {
    async function FetchData() {
      const request = await axios.get(
        `https://api.tvmaze.com/shows/${params.id}`
      );
      setFilm(request.data);
    }
    FetchData();
  }, []);

  const [disable, setDisable] = React.useState(false);
  
  const addToLiked = () => {
    let id = liked.map((i) => i.id);
    console.log(id);
    if (toggle === true) {
      setToggle(false);
    } else setToggle(true);
    console.log("add");
    setLiked(liked.concat(film));
    setDisable(true)
  };





  return (
    <div className="filmProfile">
      <div className="loginPageBackground">
        <img
          onClick={backToHomepage}
          className="loginLogo"
          src="https://pngpress.com/wp-content/uploads/2020/04/Netflix-logo.png"
        />
        <button
          disabled={disable} 
          onClick={addToLiked}
          className={`addToLiked ${toggle && "addToLikedDone"}`}
        >
          Push to liked
        </button>
      </div>
      <div className="filmInfo">
        <img src={film?.image?.original}></img>
        <div className="filmText">
          <h1>{film.name}</h1>
          <p>Genres: {film?.genres?.join(', ')}</p>
          <p>{truncate(film.summary)}</p>
          <p>Rating: {film?.rating?.average}</p>
        </div>
      </div>
    </div>
  );
};

export default FilmProfile;
