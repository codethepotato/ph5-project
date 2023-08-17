import React, { useEffect, useState } from "react";
import { Route, Routes} from "react-router-dom";

import Header from './Header'
import NavBar from './NavBar'

function App() {
  return (
    <div className="App">
        <Header />
        <NavBar />
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
