import React from "react";
import "../Style/LoginPage.css";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  let history = useHistory();

  const redirectToLogin = (event) => {
    event.preventDefault();
    history.push("/login");
  };

  const redirectToSignUp = (event) => {
    event.preventDefault();
    history.push("/signup");
  };

  return (
    <div className="loginPage">
      <div className="loginPageBackground">
        <img
          className="loginLogo"
          src="https://ars-ckd.tls.muzkult.ru/media/2020/02/03/1250044827/27348828.png"
        />
        <button className="signUpBtn" onClick={redirectToSignUp}>
          Register
        </button>
        <button className="loginPageBtn" onClick={redirectToLogin}>
          Sign in
        </button>
        <div className="loginPageGradient" />
      </div>
      <div className="loginPageBody">
        <>
          <h1>Unlimited movies, TV shows, and more.</h1>
          <h2>Watch anywhere. Cancel anytime.</h2>
          <div className="LoginPageInput"></div>
        </>
      </div>
    </div>
  );
};

export default LoginPage;
