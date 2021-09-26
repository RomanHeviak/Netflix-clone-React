import React, { useContext, useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { Context } from "../context";
import "../Style/FilmProfile.css";
import { auth } from '../firebase';
import { dataBase } from "../firebase";

const FilmProfile = () => {
  const params = useParams();
  const { film, setFilm, liked, setLiked } = useContext(Context);
  let history = useHistory();

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

  let userUID = JSON.parse(sessionStorage.getItem("user")).uid

  const addToLiked = () => {
    if(!checkIfFilIsLiked(film.id)){
      dataBase
      .ref(`${userUID}/liked`)
      .set([...liked,film])
      .then(()=>{
      })
      .catch((error)=>{
        alert(error);
      });
      setLiked([...liked,film]);
    }else {
      dataBase
      .ref(`${userUID}/liked`)
      .set(liked.filter(e=>e.id != film.id))
      .then(()=>{
      })
      .catch((error)=>{
        alert(error);
      });
      setLiked(liked.filter(e=>e.id != film.id));
    }
  };    


  const checkIfFilIsLiked = (filmId) => {
    if(liked.filter(e=>e.id == filmId).length == 0){
      return false;
    }
    return true;
  }

  

  return (
    <div className="filmProfile">
      <div className="loginPageBackground">
        <img
          onClick={backToHomepage}
          className="loginLogo"
          src="https://pngpress.com/wp-content/uploads/2020/04/Netflix-logo.png"
        />
        <button
          onClick={addToLiked}
          className={checkIfFilIsLiked(film.id)? "addToLikedDone":"addToLiked"}
        >
          {checkIfFilIsLiked(film.id)?'delete from liked':"add to liked"}
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
