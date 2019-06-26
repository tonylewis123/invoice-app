import React from 'react';
import './firstProject.css';
import HeaderSecond from '../header/HeaderSecond';
import background from "../../../assets/img/login_bg.png";
import { NavLink } from "react-router-dom";
import { POST, GET } from '../../../core/CRUD';
import queryString from 'query-string';



export default class FirstProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                    project: {},
                    error: "",
        }
    }

    async componentDidMount() {
        let projectId = window.location.href.split("/").pop();
         let response = await GET(`api/projects/${projectId}`);
         if (!response.success) {
            if (response.statusCode == 401) {
                return window.location.href = '/login';
            }
            return this.setState({ error: response.error });
        }
        this.setState({ project: response.data });
         
        
    }

    render() {
        
        let background_page = {
            backgroundImage: `url(${background})`,
        }
        return (
            <div className="Admin_page" style={background_page}>
                <div className="admin_page_size">
                    <HeaderSecond name={this.state.project.name} loc="/Admin_page" />
                    <div className="add_new_project_btn">

                        <NavLink to={"/New_task"}> <button><i className="fas fa-plus" /> Add new task</button> </NavLink>
                    </div>
                    <div className="admin_page_search">
                        <input type="text" />
                        <button><i className="fas fa-search" /></button>
                    </div>
                    <div className="firstProject_clear"></div>
                        <div className="taskInformation">
                            <p>task1</p>
                            <p>task1</p>
                        </div>
                        <div className="taskInformation">
                            <p>task1</p>
                            <p>task1</p>
                        </div>
                        <div className="taskInformation">
                            <p>task1</p>
                            <p>task1</p>
                        </div>




                </div>
            </div>
        )
    }
}
