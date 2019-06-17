import React from 'react';
import './admin_page.css';
import Header from '../header/Header';
import background from "../../../assets/img/login_bg.png";
import Projects_tests from "../project_tests/Projects_tests";
import Next_btn from "../next_btn/Next_btn"


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
                        <button><i class="fas fa-plus" i /> Add new project</button>
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
                    <button><i class="fas fa-search"></i></button>
                    </div>
                    <Projects_tests />
                    <Projects_tests />
                    <Projects_tests />
                    <Next_btn />
                </div>
            </div>
        )
    }
}
