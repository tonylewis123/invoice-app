import React from 'react';
import './newTask.css';
import HeaderSecond from '../header/HeaderSecond';
import background from "../../../assets/img/login_bg.png";
import { Input } from 'semantic-ui-react';
import Save_btn from "../save_btn/Save_btn";
import { POST, GET } from '../../../core/CRUD';



export default class newTask extends React.Component {

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
                    <HeaderSecond name="New Task" loc="/Admin_page" />
                    <div className="new_project">
                        <div className="new_project_box">
                            <p>Task Name</p>
                            <Input type="text"  />
                        </div>
                        
                        <div className="new_project_box">
                            <p>Task Date</p>
                            <Input type="date"  />
                        </div>
                       
                        <div className="new_project_box">
                            <p>Description</p>
                            <Input type="text" className="discrip_inp" />
                        </div>
                       
                    </div>
                    <Save_btn />

                </div>
            </div>
        )
    }
}
