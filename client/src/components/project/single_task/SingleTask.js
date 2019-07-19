import React from 'react';
import './singleTask.css';
import HeaderSecond from '../header/HeaderSecond';
import background from "../../../assets/img/login_bg.png";
import { Input } from 'semantic-ui-react';
import Save_btn from "../save_btn/Save_btn";
import { POST, GET, PUT } from '../../../core/CRUD';
import moment from "moment";
import Expenses from "../expenses/Expenses";
import { NavLink } from "react-router-dom";
import Load from "../../../assets/img/Load.gif"


var curr = new Date();
curr.setDate(curr.getDate());  

export default class SingleTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task: [],
            error: "",
            load: true,
            newName: false,
            newDate: false,
            newDescription: false,
            newHours: false,
            pageName : "",
            timeValue : curr.toISOString().substr(0, 10),
            expenses:[],
        }
    }


    async componentDidMount() {
        let urlData = window.location.href.split("/");
        let taskId = urlData[urlData.length - 1];


        let response = await GET(`api/tasks/${taskId}`);
        if (!response.success) {
            if (response.statusCode == 401) {
                return window.location.href = '/login';
            }
            return this.setState({ error: response.error });
        }
        this.setState({ task: response.data, load: false, pageName: response.data.name });
        
    }
    editTaskName = () => {
        this.setState({ newName: true })
    }
    editTaskDate = () => {
        this.setState({ newDate: true })
    }
    editTaskHours = () => {
        this.setState({ newHours: true })
    }
    editTaskDescription = () => {
        this.setState({ newDescription: true })
    }
    newTaskName = () => {
        this.setState({ newName: false })
    }
    newTaskDate = () => {
        this.setState({ newDate: false })
    }
    newTaskHours = () => {
        this.setState({ newHours: false })
    }
    newTaskDescription = () => {
        this.setState({ newDescription: false })
    }


    inputValue = (value, index) => {
        let task = this.state.task;
    
        
        if(value !== "" && value !== null){
            
            task[index] = value
            this.setState({ task })
          
        }
        
    }


    saveEditTask = async () => {
        let task = this.state.task;
        let taskName = task.name;
        let taskDate = task.taskDate;
        let hours = task.hours;
        let description = task.description;
        let expenses =  task.expenses;
        if (taskName === '' || taskDate === '' || hours === '' || description === '') {
            return this.setState({ error: 'All fields are required!', load: false });
        }

        let urlData = window.location.href.split("/");
        let taskId = urlData[urlData.length - 1];
    
        
        let response = await PUT(`api/tasks/${taskId}`, {
            name: taskName,
            taskDate: taskDate,
            hours: hours,
            description: description,
            expenses: expenses
        });

        if (!response.success) {
            return this.setState({ error: response.error });
        }
    }
    changeExpenses = (value,index,myIndex) => {
        const task = this.state.task;
        task.expenses[myIndex][index] = value;
        this.setState({task})
    }

    render() {
        let background_page = {
            backgroundImage: `url(${background})`,
        }
 
 
        
        
        

        return (
            <div className="Admin_page" style={background_page}>
                {this.state.load ? <img src={Load} className="loading" /> : null}
                <div className="admin_page_size" style={this.state.load ? { opacity: .2 } : {}}>
                    <HeaderSecond name={this.state.pageName} loc="/Project" />
                    <div className="new_project">

                        <div className="new_project_box">
                            <p>Task Name </p>
                            <div className="materialsCost">
                                {this.state.newName ? <Input type="text" placeholder={this.state.task.name} onChange={event => this.inputValue(event.target.value,'name')} /> : <p>{this.state.task.name}</p>}

                                <p> {this.state.newName ? <i className="fas fa-check" onClick={this.newTaskName} /> : <i className="fas fa-pencil-alt" onClick={this.editTaskName} />}  </p>
                            </div>

                        </div>

                        <div className="new_project_box">
                            <p>Task Date</p>
                            {this.state.newDate ? <Input type="date" defaultValue={this.state.timeValue} onChange={event => this.inputValue(event.target.value,'taskDate')} /> : <p>{moment(this.state.task.taskDate).format('L')}</p>}
                            <p> {this.state.newDate ? <i className="fas fa-check" onClick={this.newTaskDate} /> : <i className="fas fa-pencil-alt" onClick={this.editTaskDate} />} </p>

                        </div>
                        <div className="new_project_box">
                            <p>Hours</p>
                            <div className="materialsCost">
                                {this.state.newHours ? <Input type="number" placeholder={this.state.task.hours} onChange={event => this.inputValue(event.target.value,'hours')} /> : <p>{this.state.task.hours + " "}h</p>}
                                <p> {this.state.newHours ? <i className="fas fa-check" onClick={this.newTaskHours} /> : <i className="fas fa-pencil-alt" onClick={this.editTaskHours} />} </p>
                            </div>

                        </div>
                        <div className="new_project_box">
                            <div>
                                <p>Description</p>
                                {this.state.newDescription ? <Input type="text" placeholder={this.state.task.description} onChange={event => this.inputValue(event.target.value,'description')} /> : <p className="descript_info">{this.state.task.description} </p>}
                            </div>
                            <div className="materialsCost">

                                <p > {this.state.newDescription ? <i className="fas fa-check" onClick={this.newTaskDescription} /> : <i className="fas fa-pencil-alt" onClick={this.editTaskDescription} />} </p>
                            </div>

                        </div>

                    </div>

                    {this.state.task.expenses ? this.state.task.expenses.map((item, index) => {
                        return (
                            <Expenses element={item} key={index} myIndex={index} change={this.changeExpenses} />
                        )
                    }) : ""}



                    <div className="newTask_clear"></div>
                    <NavLink to={'/Project'}> <Save_btn btnClick={this.saveEditTask} /></NavLink>
                    <div className="newTask_clear"></div>
                </div>
            </div>
        )
    }
}
