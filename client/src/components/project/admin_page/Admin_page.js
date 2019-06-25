import React from 'react';
import './admin_page.css';
import Header from '../header/Header.js';
import background from "../../../assets/img/login_bg.png";
import Projects_tests from "../project_tests/Projects_tests";
import Next_btn from "../next_btn/Next_btn";
import { NavLink } from "react-router-dom";
import { POST, GET } from '../../../core/CRUD';
import moment from "moment";


export default class Admin_page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
        }
    }
    async componentDidMount() {
        let userId = localStorage.getItem('userId');
        if (!userId) {
            return window.location.href = '/login';
        }
        let response = await GET(`api/users/${userId}`);
        if (!response.success) {
            if (response.statusCode == 401) {
                return window.location.href = '/login';
            }
            return this.setState({ error: response.error });
        }
        this.setState({ projects: response.data.projects.reverse() });
    }
    generateProjectsItem = data => {
        return data.map((item, index) => {
            return (
                <div key={index}>
                    <div className="project_info">
                        <p>{moment(item.created_at).format('L')}</p>
                        <p>dfgdfg</p>

                    </div>
                    <Projects_tests data={item} />
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
                <div className="admin_page_size">
                    <Header />
                    <div className="add_new_project_btn">

                        <NavLink to={"/NewProject"}> <button><i className="fas fa-plus" /> Add new project</button> </NavLink>
                    </div>
                    <div className="admin_page_inputs">
                        <div className="admin_page_inputs_filtr">
                            <input type="checkbox" />
                            <p>DD/MM/YY</p>
                        </div>
                        <div className="admin_page_inputs_filtr admin_page_inputs_filtr_2">
                            <input type="checkbox" />
                            <p>Project ID</p>
                        </div>
                    </div>
                    <div className="admin_page_search">
                        <input type="text" />
                        <button><i className="fas fa-search" /></button>
                    </div>

                    {this.state.projects.length > 0 ? this.generateProjectsItem(this.state.projects) : ""}

                    <div className="admin_p_clear_top">
                        <NavLink to={"/page1"}><Next_btn /></NavLink>
                    </div>


                </div>
            </div>
        )
    }
}
