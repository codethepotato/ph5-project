import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";

import Header from './Header'
import NavBar from './NavBar'

function App() {
  return (
    <div className="App">
        <Header />
        <NavBar />
        <Routes>
          <Route path='/Home'></Route>
          <Route path='/' element={}></Route>
          <Route path='/' element={}></Route>
          <Route path='/' element={}></Route>
          <Route path='/' element={}></Route>
        </Routes>
    </div>
  );
}

export default App;
