import React from 'react';
import './newTask.css';
import HeaderSecond from '../header/HeaderSecond';
import background from "../../../assets/img/login_bg.png";
import { Input } from 'semantic-ui-react';
import Save_btn from "../save_btn/Save_btn";
import { POST, GET } from '../../../core/CRUD';
import Expenses from "../expenses/Expenses";
import { NavLink } from "react-router-dom";
import Load from "../../../assets/img/Load.gif"
import { log } from 'util';

var curr = new Date();
curr.setDate(curr.getDate());

export default class newTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks : [],
            inputs: [
                {
                    label: "Task Name",
                    isTuched: false,
                    isValid: false,
                    value: "",
                    validation: {
                        required: true,
                        email: true
                    },
                    massage: 'Please enter name'
                },
                    {
                    label: "Task Date",
                    isTuched: false,
                    isValid: false,
                    value: curr.toISOString().substr(0, 10),
                    validation: {
                        required: true,
                        email: true
                    },
                    massage: 'Please enter date'
                },
                {
                    label: "Hours",
                    isTuched: false,
                    isValid: false,
                    value: "",
                    validation: {
                        required: true,
                        email: true
                    },
                    massage: 'Please enter hours'
                },
                {
                    label: "description",
                    isTuched: false,
                    isValid: false,
                    value: "",
                    validation: {
                        required: true,
                        email: true
                    },
                    massage: 'Please enter description'
                },
                {
                    label: "Supplier",
                    isTuched: false,
                    isValid: false,
                    value: "",
                    validation: {
                        required: true,
                        email: true
                    },
                    massage: ''
                },
                {
                    label: "Materials cost",
                    isTuched: false,
                    isValid: false,
                    value: "",
                    validation: {
                        required: true,
                        email: true
                    },
                    massage: 'Please enter Materials cost'
                },
                {
                    label: "materials description",
                    isTuched: false,
                    isValid: false,
                    value: "",
                    validation: {
                        required: true,
                        email: true
                    },
                    massage: 'Please enter materials description'
                },
            ],
            error: "",
            expenses: [],
            show_expenses: false,
            clickCount : 1,
            load: false,
            projectId: ''
        }
    }


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
        
        this.setState({ tasks: response.data.tasks, projectId: response.data._id });
    }

    saveTask = async (state) => {
        // this.setState({load:true})
        let inputs = [...this.state.inputs];
        let taskName = inputs[0].value;
        let taskDate = inputs[1].value;
        let hours = inputs[2].value;
        let description = inputs[3].value;
        
        let expenses = state.expenses.map(item => {
            return {
                supplier: item.supplier,
                materialsCost: item.materials_cost,
                materialsDescription: item.materials_description
            };
        });

        if (taskName === '' || taskDate === '' || hours === '' || description === '' ) {
            return this.setState({ error: 'All fields are required!', load: false });
        }

        let response = await POST('api/tasks', {
            name: taskName,
            taskDate: taskDate,
            hours: hours,
            description: description,
            expenses: expenses,
            projectId: state.projectId
        });
        
        if (!response.success) {
            return this.setState({ error: response.error});
        }
        
        
    }

    inputValue = (value, index) => {
        let inputs = this.state.inputs;
        let input = inputs[index];
        Object.keys(input.validation).map((elem) => {
            if (elem == "required") {
                if (value == "" || value == null) {
                    input.isValid = false;
                }
                else {
                    input.isValid = true
                }

            }
        });
        input.isTuched = true;
        input.value = value;
        this.setState({ inputs })

    }
    show_expensesInp = () =>{
        this.setState({
            show_expenses: true,
        })
        if(this.state.inputs[5].isValid && this.state.inputs[6].isValid){ 
            let expenses = [...this.state.expenses]
            let exp =  {
                supplier: this.state.inputs[4].value,
                materials_cost: this.state.inputs[5].value,
                materials_description: this.state.inputs[6].value,
                expId: this.state.clickCount
             }
            expenses.push(exp);
            let inputs =  this.state.inputs;
            inputs[5].value = '';
            inputs[6].value = '';
          return  this.setState({
                clickCount:this.state.clickCount+1,
                 expenses,  
                 inputs
            })
        }
    }

    render() {
        let background_page = {
            backgroundImage: `url(${background})`,
        }

        return (
            <div className="Admin_page" style={background_page}>
                                { this.state.load ? <img src={Load}  className="loading" /> : null }
                <div className="admin_page_size" style={this.state.load?{opacity:.2}:{}}>
                    <HeaderSecond name="New Task" loc="/Project" />
                    <div className="new_project">
                        <p className="error_message">{this.state.inputs[0].isTuched && !this.state.inputs[0].isValid ? this.state.inputs[0].massage : ''}</p>
                        <div className="new_project_box">
                            <p>Task Name</p>
                            <Input type="text" defaultValue={this.state.inputs[0].value} onChange={event => this.inputValue(event.target.value, 0)} />
                        </div>
                        <p className="error_message">{this.state.inputs[1].isTuched && !this.state.inputs[1].isValid ? this.state.inputs[1].massage : ''}</p>
                        <div className="new_project_box">
                            <p>Task Date</p>
                            <Input type="date" defaultValue={this.state.inputs[1].value} onChange={event => this.inputValue(event.target.value, 1)} />
                        </div>
                        <p className="error_message">{this.state.inputs[2].isTuched && !this.state.inputs[2].isValid ? this.state.inputs[2].massage : ''}</p>
                        <div className="new_project_box">
                            <p>Hours</p>
                            <Input type="number" onChange={event => this.inputValue(event.target.value, 2)} value={this.state.inputs[2].value} />
                        </div>
                        <p className="error_message">{this.state.inputs[3].isTuched && !this.state.inputs[3].isValid ? this.state.inputs[3].massage : ''}</p>
                        <div className="new_project_box">
                            <p>Description</p>
                            <Input type="text" className="discrip_inp" onChange={event => this.inputValue(event.target.value, 3)} value={this.state.inputs[3].value} />
                        </div>

                        <div className="create_expenses_box" >
                            <div className="create_expenses" onClick={this.show_expensesInp}>
                                <p> <i className="fas fa-plus" /></p>
                                <p className="create_expenses_tittle">Expenses</p>
                            </div>
                        </div>

                    </div>
                   
                    {this.state.show_expenses ?  <div className="new_project">
                        <div className="new_project_box">
                            <p>Supplier</p>
                            <select onChange={event => this.inputValue(event.target.value, 4)} value={this.state.inputs[4].value}>
                                <option>
                                    1
                                </option>
                                <option>
                                   2
                                </option>
                                <option>
                                   3
                                </option>
                            </select>
                        </div>
                        <p className="error_message">{this.state.inputs[5].isTuched && !this.state.inputs[5].isValid ? this.state.inputs[5].massage : ''}</p>
                        <div className="new_project_box">
                            <p>Materials cost</p>
                            <Input type="text" onChange={event => this.inputValue(event.target.value, 5)} value={this.state.inputs[5].value} />
                        </div>
                        <p className="error_message">{this.state.inputs[6].isTuched && !this.state.inputs[6].isValid ? this.state.inputs[6].massage : ''}</p>
                        <div className="new_project_box">
                            <p>Materials description</p>
                            <Input type="text" onChange={event => this.inputValue(event.target.value, 6)} value={this.state.inputs[6].value} />
                        </div>

                    </div> : ""}

                    
                    {this.state.expenses.map((item, index)=>{
                         return (
                            <Expenses key={index} element={item} />
                         )
                    })}
                    <div className="newTask_clear"></div>
                    <Save_btn  btnClick={() => this.saveTask(this.state)} />
                    <div className="newTask_clear"></div>
                </div>
            </div>
        )
    }
}
