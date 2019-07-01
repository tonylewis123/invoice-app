import React from 'react';
import './firstProject.css';
import HeaderSecond from '../header/HeaderSecond';
import background from "../../../assets/img/login_bg.png";
import { NavLink } from "react-router-dom";
import { POST, GET } from '../../../core/CRUD';
import queryString from 'query-string';
import Load from "../../../assets/img/Load.gif"



export default class FirstProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                    project: {},
                    error: "",
                    load: true
        }
    }

    async componentWillMount() {
        let projectId = window.location.href.split("/").pop();
         let response = await GET(`api/projects/${projectId}`);
         if (!response.success) {
            if (response.statusCode == 401) {
                return window.location.href = '/login';
            }
            return this.setState({ error: response.error });
        }
        this.setState({ project: response.data, load: false });
        console.log(this.state.project, "pr");
    }


    generateProjectsTask = () => {
        let tasks = this.state.project.tasks; 
        console.log('tesar',tasks);
        
       return tasks.map((item, index) => {
            return (
                <div className="taskInformation" key={index}>
                <p>{item.name}</p>
                <p>{item.hours+" h"}</p>
            </div>
            )
        })
    }
    render() {
      
        
        let background_page = {
            backgroundImage: `url(${background})`,
        }
        return (
            <div className="Admin_page" style={background_page}>
                 { this.state.load ? <img src={Load}  className="loading" /> : null }
                <div className="admin_page_size" style={this.state.load?{opacity:.2}:{} }>
                    <HeaderSecond name={this.state.project.name} loc="/Project" />
                    <div className="add_new_project_btn">

                        <NavLink to={`/single_project/${this.state.project._id}/New_task`}> <button><i className="fas fa-plus" /> Add new task</button> </NavLink>
                    </div>
                    <div className="admin_page_search">
                        <input type="text" />
                        <button><i className="fas fa-search" /></button>
                    </div>
                    <div className="firstProject_clear"></div>
                    {this.state.project.tasks?this.state.project.tasks.length > 0 ? this.generateProjectsTask() : "":''}



                </div>
            </div>
        )
    }
}
