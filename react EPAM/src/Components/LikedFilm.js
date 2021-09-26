import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../context";
import { dataBase } from "../firebase";
import "../Style/LikedFilm.css";

const LikedFilm = () => {
  const { liked,setFilm,setLiked, } = useContext(Context);

  let history = useHistory();
  let userUID = JSON.parse(sessionStorage.getItem("user")).uid

  useEffect(()=>{
    dataBase
    .ref(`${userUID}/liked`)
    .on('value', snapshot=>{
      const arr = snapshot.val()
      if(arr){
        arr.length === 0? setLiked([]):setLiked(arr)
      }
    })
  },[])

  const backToHomepage = (event) => {
    event.preventDefault();
    history.push("/homepage");
  };

  function filmItem(id) {
    let item = liked.filter((film) => film.id == id.target.id);
    setFilm(item);
    history.push(`/filmprofile/${item.map((i) => i.id)}`);
  }



  return (
    <div className="likedPage">
      <img
        className="logo"
        onClick={backToHomepage}
        src="https://pngpress.com/wp-content/uploads/2020/04/Netflix-logo.png"
        alt=""
      />
      <div className="LikedFilms">
        {liked.map((movie) => (
          <div className="likedFilm">
            <img
              onClick={filmItem}
              id={movie.id}
              className={`filmImg`}
              key={movie.id}
              src={movie?.image?.original}
              alt={movie.name}
            />
            <p>{movie.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedFilm;
