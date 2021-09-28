import React from "react";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
import "../Style/Profile.css";

const Profile = () => {
  let user = JSON.parse(sessionStorage.getItem("user"));
  let history = useHistory();

  const backToHomepage = (event) => {
    event.preventDefault();
    history.push("/homepage");
  };

  function logOut() {
    auth
      .signOut()
      .then(() => {
        sessionStorage.setItem("user", null);
        history.push("/");
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <div className="profile">
      <img
        onClick={backToHomepage}
        className="logo"
        src="https://pngpress.com/wp-content/uploads/2020/04/Netflix-logo.png"
        alt="netflixLogo"
      />
      <h2 style={{ color: "white" }}> Name: {user?.displayName}</h2>
      <h2 style={{ color: "white" }}> Email: {user?.email}</h2>
      <button className="logoutBtn" onClick={logOut}>
        Log out
      </button>
    </div>
  );
};

export default Profile;
