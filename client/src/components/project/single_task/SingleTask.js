import React from 'react';
import './singleTask.css';
import HeaderSecond from '../header/HeaderSecond';
import background from "../../../assets/img/login_bg.png";
import { Input } from 'semantic-ui-react';
import Save_btn from "../save_btn/Save_btn";
import { POST, GET } from '../../../core/CRUD';
import Expenses from "../expenses/Expenses"



export default class SingleTask extends React.Component {



    async componentDidMount() {
        let urlData = window.location.href.split("/");
        let projectId = urlData[urlData.length-2];
        
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
                    <HeaderSecond name="Task 1" loc="/Project" />
                    <div className="new_project">
               
                        <div className="new_project_box">
                            <p>Task Name</p>
                            <div className="materialsCost">
                            <p>Task Name</p>
                            <p><i className="fas fa-pencil-alt" /></p>
                        </div>

                        </div>
                     
                        <div className="new_project_box">
                            <p>Task Date</p>
                            <p>Task Date</p>
                            
                        </div>
                        <div className="new_project_box">
                            <p>Hours</p>
                            <div className="materialsCost">
                            <p>Hours</p>
                            <p><i className="fas fa-pencil-alt" /></p>
                        </div>
                           
                        </div>
                        <div className="new_project_box">
                            <div>
                            <p>Description</p>
                            <p className="descript_info">xcvxcvvxcv
                                jkhcxvjkxc
                                hvkjcxhvkj
                                xchvjkxchv
                                xckjvhxck
                                jvhkcj</p>
                            </div>
                            <div className="materialsCost">
                            
                            <p><i className="fas fa-pencil-alt" /></p>
                        </div>
                            
                        </div>
                        


                    </div>
                   
  
                    {/* <Expenses  /> */}
                    
                 
                    <div className="newTask_clear"></div>
                    <Save_btn  btnClick={this.saveTask} />
                    <div className="newTask_clear"></div>
                </div>
            </div>
        )
    }
}
