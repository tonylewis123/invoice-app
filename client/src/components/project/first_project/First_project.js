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
            // projectId: window.location.pathname.split('/')[2]
        }
    }

    // async componentDidMount() {
    //     const values = queryString.parse(this.props.location.search);
    //     console.log(values.projectId, '======');
    //     // let response = await GET(`api/users/`);
        
    // }

    render() {
        let background_page = {
            backgroundImage: `url(${background})`,
        }
        return (
            <div className="Admin_page" style={background_page}>
                <div className="admin_page_size">
                    <HeaderSecond name="Project Name" loc="/Admin_page" />
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
