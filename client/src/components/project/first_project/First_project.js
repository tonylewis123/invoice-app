import React from 'react';
import './AddNewProject.css';
import HeaderSecond from '../header/HeaderSecond';
import background from "../../../assets/img/login_bg.png";
import Projects_tests from "../project_tests/Projects_tests";
import { NavLink } from "react-router-dom";
import { Input } from 'semantic-ui-react';
import Next_btn from "../next_btn/Next_btn";
import Save_btn from "../save_btn/Save_btn"


export default class AddNewProject extends React.Component {
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
                    <HeaderSecond name="New Project" loc="/Admin_page" />
                    <div className="new_project">
                        <div className="new_project_box">
                            <p>Project Name</p>
                            <Input type="text" />
                        </div>
                        <div className="new_project_box">
                            <p>Project Date</p>
                            <Input type="text" />
                        </div>
                        <div className="new_project_box">
                            <p>Discription</p>
                            <Input type="text" className="discrip_inp" />
                        </div>
                    </div>
                    <div className="addNewPrClear_top">
                    <Save_btn  />
                    </div>

                    <Projects_tests />
                    <Projects_tests />

                    <div className="addNewPrClear_bottom">
                    <NavLink to={"/page1"}><Next_btn /></NavLink>
                    </div>

                </div>
            </div>
        )
    }
}
