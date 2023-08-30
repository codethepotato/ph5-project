import React, { useCallback, useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import Header from './Header';
import NavBar from './NavBar';
import Members from './Members';
import SocialEvents from './SocialEvents';
import Initiation from './Initiation';
import Groups from "./Groups";
import { UserContext } from "./Context/user";

function App() {

  const {user, setUser} = useContext(UserContext)

  useEffect(() => {
    fetch('/auth')
      .then(r => {
        if (r.ok) {
          r.json().then(cat => setUser(cat))
        }
      })
  },[])

  return (
    <div >
        <Header />
        <NavBar />
        <Routes>
          <Route path='/'></Route>
          <Route path='/Home' element = {<Home />}></Route>
          <Route path='/Members' element = {<Members />}></Route>
          <Route path='/SocialEvents' element = {<SocialEvents/>}></Route>
          <Route path='/Initiation' element = {<Initiation/>}></Route>
          <Route path='/Groups' element = {<Groups />}></Route>
        </Routes>
        <h1>Here at Purr-Gatory we accept all kinds of feline friends! 
            We invite you to join us for activities where you can meet 
            groups and their members. 
        </h1>
        <img className = 'group-photo' src='/Cat_cult_imgs/group_photo.png' />
    </div>
  );
}

export default App;
