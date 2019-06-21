import React from 'react';
import './admin_page.css';
import Header from '../header/Header.js';
import background from "../../../assets/img/login_bg.png";
import Projects_tests from "../project_tests/Projects_tests";
import Next_btn from "../next_btn/Next_btn";
import { NavLink } from "react-router-dom";


export default class Admin_page extends React.Component {
    constructor(props) {
        super(props);
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
                        
                        <NavLink to={"/NewProject"}> <button><i className="fas fa-plus"  /> Add new project</button> </NavLink>
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
                    <Projects_tests />
                    <Projects_tests />
                    <Projects_tests />
                    <div className="admin_p_clear_top">
                    <NavLink to={"/page1"}><Next_btn /></NavLink>
                    </div>

                    
                </div>
            </div>
        )
    }
}
