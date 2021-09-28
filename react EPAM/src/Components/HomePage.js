import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import "../Style/HomePage.css";
import Navbar from "../Components/NavBar";
import Banner from "../Components/Banner";
import requests from "../Request";
import Row from "./Row";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");
  const [search, setSearch] = useState("");
  const [listToShow, setListToShow,] = useState("");

  const genres = ["Comedy", "Drama", "Family", "Horror", "Action"];

  let history = useHistory();

  if (JSON.parse(sessionStorage.getItem("user")) === null) {
    history.push("/login");
  }


  const filteredFilms = useMemo(() => {
    if (!movies.length) return [];

    const filteredMovies = movies
      .filter(({ genres }) => !selectedSort || genres.includes(selectedSort))
      .filter(({ name }) => name.includes(search));

    if (listToShow === 'rating') {
      return filteredMovies.sort((a, b) => b.rating.average - a.rating.average);
    } else if (listToShow === 'name') {
      return filteredMovies.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filteredMovies;

  }, [search, selectedSort, movies, listToShow]);


  useEffect(() => {
    async function FetchData() {
      const request = await axios.get(requests.fetchShow);
      setMovies(request.data);
      return request;
    }
    FetchData();
  }, []);

  return (
    <div className="homePage">
      <Navbar
        search={search}
        setSearch={setSearch}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        listToShow ={listToShow}
        setListToShow={setListToShow}
        sortedFilms ={filteredFilms}
      />
      <Banner />
      <div className="homepage">
        {selectedSort ? (
          <Row
            title={selectedSort}
            movies={filteredFilms.filter(({ genres }) =>
              genres.includes(selectedSort)
            )}
            isLareRow
          />
        ) : (
          genres.map((item) => (
            <Row
            key={item}
              title={item}
              movies={filteredFilms.filter(({ genres }) =>
                genres.includes(item)
              )}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
