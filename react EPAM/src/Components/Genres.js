// import React, { useContext } from "react";
// import { useHistory } from "react-router-dom";
// import { Context } from "../context";

// const Genres = () => {
//   let history = useHistory();
//   const { selectedSort, movies, setFilm ,listToShow} = useContext(Context);
//   let isLargeRow = false;

//   function filmItem(id) {
//     let item = movies.filter((film) => film.id == id.target.id);
//     setFilm(item);
//     history.push(`/filmprofile/${item.map((i) => i.id)}`);
//   }

//   return (
//     <div className="row">
//       <h2>{selectedSort}</h2>
//       <div className="rowPosters">
//         {listToShow
//           .filter((i) => i.genres.includes(selectedSort))
//           .map(
//             (movie) =>
//               !isLargeRow &&
//               movie?.image?.original && (
//                 <div className="rowItem">
//                   <img
//                     id={movie.id}
//                     onClick={filmItem}
//                     className={`rowPoster ${isLargeRow && "rowPosterLarge"}`}
//                     key={movie.id}
//                     src={`${isLargeRow ? null : movie?.image?.original}`}
//                     alt={movie.name}
//                   />
//                   <p>{movie.name}</p>
//                 </div>
//               )
//           )}
//       </div>
//     </div>
//   );
// };

// export default Genres;
