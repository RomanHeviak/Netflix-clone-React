import React, { useContext} from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../context";
import "../Style/Row.css";

const Row = ({ title, movies}) => {
  let history = useHistory();
  const { setFilm,} = useContext(Context);

  function filmItem(id) {
    let item = movies.filter((film) => film.id == id.target.id);
    setFilm(item);
    history.push(`/filmprofile/${item.map((i) => i.id)}`);
  }

  return (
    <>
      {movies.length && (
        <div className="row">
          <h2>{title}</h2>
          <div className="rowPosters">
            {movies
              .filter((i) => i.genres.includes(title))
              .map(
                (movie) =>
                  movie?.image?.original && (
                    <div className="rowItem">
                      <img
                        id={movie.id}
                        onClick={filmItem}
                        className={`rowPoster`}
                        key={movie.id}
                        src={`${movie?.image?.original}`}
                        alt={movie.name}
                      />
                      <p>{movie.name}</p>
                    </div>
                  )
              )}
          </div>
        </div>
      )}
    </>
  );
};

export default Row;
