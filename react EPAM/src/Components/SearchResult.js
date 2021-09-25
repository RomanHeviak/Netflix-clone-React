import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../context";

const SearchResult = () => {
  const { setFilm, movies, search } = useContext(Context);
  let history = useHistory();
  let isLargeRow = false;

  function filmItem(id) {
    let item = movies.filter((film) => film.id == id.target.id);
    setFilm(item);
    history.push(`/filmprofile/${item.map((i) => i.id)}`);
  }

  return (
    <div>
      <h2 style={{ color: "white", margin: "20px 0 0 20px" }}>Result</h2>
      <div className="rowPosters">
        {movies
          .filter((i) => i.name.includes(search))
          .map(
            (movieItem) =>
              search.length > 0 &&
              !isLargeRow &&
              movieItem?.image?.original && (
                <div className="rowItem">
                  <img
                    id={movieItem.id}
                    className={`rowPoster ${isLargeRow && "rowPosterLarge"}`}
                    key={movieItem.id}
                    src={`${isLargeRow ? null : movieItem?.image?.original}`}
                    alt={movieItem.name}
                    onClick={filmItem}
                  />
                  <p style={{ color: "white" }}>{movieItem.name}</p>
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default SearchResult;
