import React, { useEffect, useState } from "react";
import "../Style/NavBar.css";
import { useHistory } from "react-router-dom";
import Select from "./Select";
import Sort from "./Sort";

const Navbar = (props) => {
  const [show, handleShow] = useState(false);

  const {
    search,
    setSearch,
    selectedSort,
    setSelectedSort,
    listToShow,
    setListToShow,
    sortedFilms
  } = props;

  let history = useHistory();

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  const showProfile = (event) => {
    event.preventDefault();
    history.push("/profile");
  };

  const showFriends = (event) => {
    event.preventDefault();
    history.push("/people");
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  

  return (
    <div className={`nav ${show && "navBlack"}`}>
      <div className="navContent">
        <img
          className="logo"
          src="https://pngpress.com/wp-content/uploads/2020/04/Netflix-logo.png"
          alt="netflixLogo"
        />

        <input
          placeholder="Search"
          className="search-bar"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          value={selectedSort}
          onChange={setSelectedSort}
          defaultValue="All genres"
          options={[
            { value: "Family", name: "Family" },
            { value: "Drama", name: "Drama" },
            { value: "Comedy", name: "Comedy" },
            { value: "Horror", name: "Horror" },
            { value: "Action", name: "Action" },
            { value: "", name: "All genres" },
          ]}
        />
           <Sort 
          value={listToShow}
          onChange={setListToShow}
          className="ratingBtn" 
          onClick={sortedFilms}
          defaultValue="Sorting"
          options={[
            { value: "name", name: "By  name" },
            { value: "rating", name: "By rating" },
          ]}
        />
        <img
        title='profile'
          onClick={showProfile}
          className="avatar"
          src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/e70b1333850498.56ba69ac32ae3.png"
          alt="avatart"
        />

        <img
        title='friends'
          onClick={showFriends} 
          className="friends"
          src="https://st4.depositphotos.com/38837296/39706/v/600/depositphotos_397060242-stock-illustration-best-friends-icon-vector-from.jpg"
          alt="friends"
        />
        </div>
    </div>
  );
};

export default Navbar;
