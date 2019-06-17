import React from 'react';
import './App.css';
import Login from "./components/Login/Login.jsx";
import Page1 from "./components/project/page1/Page1"
import {Route,NavLink} from "react-router-dom";



function App() {
  return (
    <div className="App">
      <Route path={'/'} exact={true} component={Login}  />
      <Route path={'/page1'} exact={true} component={Page1}  />
    </div>
  );
}

export default App;
