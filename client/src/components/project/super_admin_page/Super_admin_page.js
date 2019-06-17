import React from 'react';
import './super_admin_page.css';
import Header from '../header/Header';
import background from "../../../assets/img/login_bg.png";

export default class Super_admin_page extends React.Component {
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
                        <button>Create</button>
                    </div>
                    <div className="admin_page_inputs">
                        <div className="admin_page_inputs_filtr">
                            <input type="radio" name="user" checked />
                            <p>Employer</p>
                        </div>
                        <div className="admin_page_inputs_filtr admin_page_inputs_filtr_2">
                            <input type="radio" name="user"  />
                            <p>Admin</p>
                        </div>
                    </div>
                    <div className="admin_page_search">
                    <input type="text" placeholder="Email" />
                    <input type="text" placeholder="Full name" />
                    <input type="text" placeholder="role" />
                    
                    </div>
                </div>
            </div>
        )
    }
}
