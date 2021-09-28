import axios from "axios";
import React, { useEffect, useState } from "react";
import requests from "../Request";
import { useHistory } from "react-router-dom";
import "../Style/Banner.css";

const Banner = () => {
  let history = useHistory();
  const [movie, setMovie] = useState([]);
  const showLiked = (event) => {
    event.preventDefault();
    history.push("/liked");
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchEpisods);
      setMovie(
        request.data[Math.floor(Math.random() * request.data.length - 1)]
      );
      return request;
    }
    fetchData();
  }, []);

  function truncate(string, n) {
    string = string?.replace("</p>", " ").replace("<p>", " ");
    string = string?.replace("<b>", " ").replace("</b>", " ");
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("${movie?.image?.original}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="bannerContents">
        <h1 className="bannerTitle">{movie?.name}</h1>
        <div className="bannerButtons">
          <button onClick={showLiked} className="bannerButton">
            My List of favorite
          </button>
        </div>
        <h1 className="bannerDescription">{truncate(movie?.summary, 200)}</h1>
      </div>
      <div className="bannerFadeBottom"></div>
    </header>
  );
};

export default Banner;
