import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from './Header';
import NavBar from './NavBar';
import Members from './Members';
import SocialEvents from './SocialEvents';
import Initiation from './Initiation';
import Groups from "./Groups";

function App() {

  const [user, setUser] = useState(null);

  const updateUser = (user) => setUser(user)

  return (
    <div >
        <Header />
        <NavBar updateUser = {updateUser}/>
        <Routes>
          <Route path='/Home'></Route>
          <Route path='/Members' element = {<Members />}></Route>
          <Route path='/SocialEvents' element = {<SocialEvents/>}></Route>
          <Route path='/Initiation' element = {<Initiation/>}></Route>
          <Route path='/Groups' element = {<Groups />}></Route>
        </Routes>
    </div>
  );
}

export default App;
