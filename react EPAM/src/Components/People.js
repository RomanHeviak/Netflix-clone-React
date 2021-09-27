import React, {useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import "../Style/People.css";
import axios from "axios";
import requests from "../Request";
import { dataBase } from "../firebase";


const People = () => {
    const [people, setPeople] = useState([]);
    const [show, handleShow] = useState(false);
    const [search,setSearch] = useState('')
    const [friends, setFriends] = useState([]);
    const [peopleActive, setPeopleActive] = useState(false);
    const [friendsActive, setFriendActives] = useState(true);

    let history = useHistory();

    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar);
        return () => window.removeEventListener("scroll", transitionNavBar);
      }, []);

    const transitionNavBar = () => {
        if (window.scrollY > 40) {
          handleShow(true);
        } else {
          handleShow(false);
        }
      };

    const backToHomepage = (event) => {
        event.preventDefault();
        history.push("/homepage");
      };

    const peopleClick = () =>{
      setPeopleActive(true)
      setFriendActives(false)
    }
    const friendsClick = () =>{
      setPeopleActive(false)
      setFriendActives(true)
    }
    let userUID = JSON.parse(sessionStorage.getItem("user")).uid

    const addFriend = (event) => {
      let id = event.target.id;
      if(friends.filter(e=>e === id).length == 0){
        dataBase
          .ref(`friends/${userUID}`)
          .set([...friends, id])
          .then(()=>{
            updateFriends();
          })
          .catch((error)=>{
            alert(error);
          });
        }else{
          dataBase
          .ref(`friends/${userUID}`)
          .set(friends.filter(e=>e!=id))
          .then(()=>{
            updateFriends();
          })
          .catch((error)=>{
            alert(error);
          });
        }
    }

    function updateFriends(){
      dataBase
      .ref(`friends/${userUID}`)
      .on('value', snapshot=>{
        const arr = snapshot.val();
        if(arr){
          setFriends(arr)
        }else{
          setFriends([]);
        }
      });
    }

    useEffect(() => {
        async function FetchData() {
          const request = await axios.get(requests.fetchPeople);
          setPeople(request.data);
          return request;
        }
        FetchData();
        updateFriends();
      }, []);
      return (
        <div className='user'>
           <div className= {`scroll ${show && "navBlack"}`}>
        <img
           onClick={backToHomepage}
           className="logo"
           src="https://pngpress.com/wp-content/uploads/2020/04/Netflix-logo.png"
           alt=""
         />
         <div className="userFriends">
           <span
             style={{ color: peopleActive ? "red" : "white" }}
             className="people"
             onClick={peopleClick}
           >
             All users
           </span>
           <span
             style={{ color: friendsActive ? "red" : "white" }}
             className="friend"
             onClick={friendsClick}
           >
             Friends
           </span>
           <input value={search} onChange={(e) => setSearch(e.target.value)} className='personSearch' type='text' placeholder='search'/>
           </div>
         </div>
       <div className='peopleContainer'>
         {peopleActive?(people.filter(i=>i.name.includes(search)).map(i=>
         <div className='showPeople'>
           <h2>{i.name}</h2>
           <button id={i.id} onClick={addFriend} className={`addFriend`  + (friends.includes(String(i.id)) ? ' gray' : ' red') }>
             {friends.includes(String(i.id)) ?'Delete friend':'Add friend'}</button>
         </div>))
         :(friends.map(e=>people.find(p=>p.id == e))
         .filter(f=>f.name.includes(search))
         .map(f=><div className='showPeople'>
         <h2>{f.name}</h2>
         <button id={f.id} onClick={addFriend} className='addFriend gray'>Delete friend</button>
         </div>))}
         </div>
        </div>
       
     );
         }

export default People;