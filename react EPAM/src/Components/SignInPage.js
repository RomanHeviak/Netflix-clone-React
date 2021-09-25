import React, { useState } from "react";
import { auth } from "../firebase";
import "../Style/SignInPage.css";
import { useHistory } from "react-router-dom";
import "../Style/SignInPage.css";

let isLoginFailed = false;
let loginError = null;

const SignInPage = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  let history = useHistory();

  const register = (event) => {
    event.preventDefault();
    history.push("/signup");
  };

  const signIn = (event) => {
    const stored = sessionStorage.getItem("user");
    setError(false);
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        loginError = null;
        isLoginFailed = false;
        sessionStorage.setItem("user", JSON.stringify(auth.currentUser));
        history.push("/homepage");
      })
      .catch((error) => {
        isLoginFailed = true;
        loginError = {
          errorCode: error.code,
          errorMessage: error.message,
        };
        setError(true);
      });
  };

  const start = (event) => {
    event.preventDefault();
    history.push("/start");
  };

  return (
    <div className="signInPageBGImage">
      <div className="signInPage">
        <div className="loginPageBackground">
          <img
            onClick={start}
            className="loginLogo"
            src="https://pngpress.com/wp-content/uploads/2020/04/Netflix-logo.png"
          />
        </div>
        <form className="form">
          <h1>Sing In</h1>
          <input
            onChange={(e) => setemail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          {isLoginFailed === true ? (
            <div style={{ color: "white" }}>{loginError.errorMessage}</div>
          ) : (
            ""
          )}
          <button onClick={signIn} type="submit">
            Sign In
          </button>

          <h4>
            <span className="span">New to Netflix?</span>
            <span className="link" onClick={register}>
              {" "}
              Sign up now.
            </span>
          </h4>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
