import React from 'react';
import './App.css';
import Login from "./components/Login/Login.jsx";
import Page1 from "./components/project/page1/Page1";
import {Route,NavLink} from "react-router-dom";
import Admin_page from "./components/project/admin_page/Admin_page";
import Project from "./components/project/Project";
import Super_admin_page from './components/project/super_admin_page/Super_admin_page';
import AddNewProject from "./components/project/add_new_project/AddNewProject";
import FirstProject from "./components/project/first_project/First_project";
import NewTask from "./components/project/new_task/NewTask";
import SingleTask from "./components/project/single_task/SingleTask"



function App() {
  return (
    <div className="App">
      <Route path={'/'} exact={true} component={Login}  />
      <Route path={'/login'} exact={true} component={Login}  />
      {/* <Route path={'/page1'} exact={true} component={Page1}  /> */}
      <Route path={'/Admin_page'} exact={true} component={Admin_page}  />
      <Route path={'/Project'} exact={true} component={Project}  />
      <Route path={'/NewProject'} exact={true} component={AddNewProject}  />
      <Route path={'/single_project/:id'} exact={true} component={FirstProject} /> 
      <Route path={'/single_project/:id/New_task'} exact={true} component={NewTask} /> 
      <Route path={'/SingleTask/:id'} exact={true} component={SingleTask} /> 
    </div>
  );
}

export default App;
