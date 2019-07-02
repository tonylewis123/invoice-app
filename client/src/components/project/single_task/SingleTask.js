import React from 'react';
import './singleTask.css';
import HeaderSecond from '../header/HeaderSecond';
import background from "../../../assets/img/login_bg.png";
import { Input } from 'semantic-ui-react';
import Save_btn from "../save_btn/Save_btn";
import { POST, GET } from '../../../core/CRUD';
import moment from "moment";
import Expenses from "../expenses/Expenses";
import { NavLink } from "react-router-dom";
import Load from "../../../assets/img/Load.gif"


export default class SingleTask extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            task : [],
            error: "",
            load: true,
            newName: false,
            newDescription : false,
            newHourse : false,

        }
    }


    async componentDidMount() {

        let urlData = window.location.href.split("/");
        let taskId = urlData[urlData.length-1];

        
         let response = await GET(`api/tasks/${taskId}`);
         if (!response.success) {
            if (response.statusCode == 401) {
                return window.location.href = '/login';
            }
            return this.setState({ error: response.error });
        }  
        this.setState({ task: response.data, load: false });    
    }
    editTaskName = () => {
        this.setState({ newName: true})
    }
    editTaskHourse = () => {
        this.setState({ newHourse: true})
    }
    editTaskDescription = () => {
        this.setState({ newDescription: true})
    }






    render() {
        let background_page = {
            backgroundImage: `url(${background})`,
        }

        return (
            <div className="Admin_page" style={background_page}>
                 { this.state.load ? <img src={Load}  className="loading" /> : null }
                <div className="admin_page_size" style={this.state.load?{opacity:.2}:{} }>
                    <HeaderSecond name={this.state.task.name} loc="/Project" />
                    <div className="new_project">
               
                        <div className="new_project_box">
                            <p>Task Name </p>
                            <div className="materialsCost">
                                {this.state.newName ? <Input type="text" /> : <p>{this.state.task.name}</p>}
                            
                            <p onClick={this.editTaskName}> {this.state.newName ?  <i className="fas fa-check" /> : <i className="fas fa-pencil-alt" /> }  </p>
                        </div>

                        </div>
                     
                        <div className="new_project_box">
                            <p>Task Date</p>
                            <p>{moment(this.state.task.taskDate).format('L')}</p>
                            
                        </div>
                        <div className="new_project_box">
                            <p>Hours</p>
                            <div className="materialsCost">
                            {this.state.newHourse ? <Input type="text" /> : <p>{this.state.task.hours+" "}h</p>}
                            <p onClick={this.editTaskHourse}> {this.state.newHourse ? <i className="fas fa-check" /> : <i className="fas fa-pencil-alt" />} </p>
                        </div>
                           
                        </div>
                        <div className="new_project_box">
                            <div>
                            <p>Description</p>
                             {this.state.newDescription ? <Input type="text" /> : <p className="descript_info">{this.state.task.description} </p>} 
                            </div>
                            <div className="materialsCost">
                            
                            <p > {this.state.newDescription ? <i className="fas fa-check" onClick={()=>{this.setState({newDescription: false})}} /> : <i className="fas fa-pencil-alt" onClick={this.editTaskDescription} /> } </p>
                        </div>
                            
                        </div>

                    </div>
                   
                    {this.state.task.expenses ? this.state.task.expenses.map((item, index)=>{
                        return(
                            <Expenses  element={item} key={index}/> 
                        )
                    }) : ""}
                    
                    
                 
                    <div className="newTask_clear"></div>
                    <NavLink to={'/Project'}> <Save_btn   /></NavLink>
                    <div className="newTask_clear"></div>
                </div>
            </div>
        )
    }
}
