import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../context";
import "../Style/LikedFilm.css";

const LikedFilm = () => {
  const { liked,setFilm } = useContext(Context);

  let history = useHistory();

  const backToHomepage = (event) => {
    event.preventDefault();
    history.push("/homepage");
  };

  function filmItem(id) {
    let item = liked.filter((film) => film.id == id.target.id);
    console.log(item)
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
