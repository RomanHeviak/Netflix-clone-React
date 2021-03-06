import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../context";
import { dataBase } from "../firebase";
import "../Style/FavoriteFilm.css";

const LikedFilm = () => {
  const { favorite,setFilm,setFavorite, } = useContext(Context);

  let history = useHistory();
  let userUID = JSON.parse(sessionStorage.getItem("user")).uid

  useEffect(()=>{
    dataBase
    .ref(`${userUID}/favorite`)
    .on('value', snapshot=>{
      const arr = snapshot.val()
      if(arr){
        arr.length === 0? setFavorite([]):setFavorite(arr)
      }
    })
  },[])

  const backToHomepage = (event) => {
    event.preventDefault();
    history.push("/homepage");
  };

  function filmItem(id) {
    let item = favorite.filter((film) => film.id == id.target.id);
    setFilm(item);
    history.push(`/filmprofile/${item.map((i) => i.id)}`);
  }



  return (
    <div className="likedPage">
      <img
        className="logo"
        onClick={backToHomepage}
        src="https://ars-ckd.tls.muzkult.ru/media/2020/02/03/1250044827/27348828.png"
        alt="netflixLogo"
      />
      <h1 className='favorite'>{favorite.length?'Favorite list':'No favorite'}</h1>
      <div className="LikedFilms">
        {favorite.map((movie) => (
          <div key={movie.id} className="likedFilm">
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
