import React, { useState } from 'react';
import { auth } from '../firebase';
import { useHistory } from "react-router-dom";
import '../Style/SingUp.css'

const SignUpPage = () => {
    const [email, setemail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    let history = useHistory();

    function register(event){
        if(password !== passwordConfirm || password===""){
            alert("password is not same or empty")

        }else{
        event.preventDefault();
        auth.createUserWithEmailAndPassword(
            email,
            password
        ).then((authUser) => {
            let disname = `${firstName} ${lastName}`;
           auth.currentUser.updateProfile({displayName:disname});
           history.push('/login')
        })
        .catch((error) =>{
            alert(error.message)
        })
    }
    }

    const start = (event) => {
        event.preventDefault()
        history.push('/')
    }

    return (
        <div className='signUp'>
        <img onClick={start}
          className="loginLogo"
          src="https://pngpress.com/wp-content/uploads/2020/04/Netflix-logo.png"
        />

            <form className='signUpForm'>
            <h1>Sign Up</h1>
            <h2>Fill out the form</h2>
            <input onChange={(e) => setFirstName(e.target.value)} type='text' placeholder='First Name'></input>
            <input onChange={(e) => setLastName(e.target.value)} type='text' placeholder='Last Name'></input>
            <input onChange={(e) => setemail(e.target.value)} type='text' placeholder='Email'></input>
            <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password'></input>
            <input onChange={(e) => setPasswordConfirm(e.target.value)}  type='password' placeholder='Repeat password'></input>
            <button onClick={register} type='submit'>Sign up</button>
            </form>
        </div>
    );
};

export default SignUpPage;