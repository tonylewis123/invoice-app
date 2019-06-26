import React from 'react';
import './newTask.css';
import HeaderSecond from '../header/HeaderSecond';
import background from "../../../assets/img/login_bg.png";
import { Input } from 'semantic-ui-react';
import Save_btn from "../save_btn/Save_btn";
import { POST, GET } from '../../../core/CRUD';
import Expenses from "../expenses/Expenses"

var curr = new Date();
curr.setDate(curr.getDate());

export default class newTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputs: [
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
            expenses: []
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

    render() {
        let background_page = {
            backgroundImage: `url(${background})`,
        }

        return (
            <div className="Admin_page" style={background_page}>
                <div className="admin_page_size">
                    <HeaderSecond name="New Task" loc="/Admin_page" />
                    <div className="new_project">
                        <p className="error_message">{this.state.inputs[0].isTuched && !this.state.inputs[0].isValid ? this.state.inputs[0].massage : ''}</p>
                        <div className="new_project_box">
                            <p>Task Date</p>
                            <Input type="date" defaultValue={this.state.inputs[0].value} onChange={event => this.inputValue(event.target.value, 0)} />
                        </div>
                        <p className="error_message">{this.state.inputs[1].isTuched && !this.state.inputs[1].isValid ? this.state.inputs[1].massage : ''}</p>
                        <div className="new_project_box">
                            <p>Hours</p>
                            <Input type="text" onChange={event => this.inputValue(event.target.value, 1)} value={this.state.inputs[1].value} />
                        </div>
                        <p className="error_message">{this.state.inputs[2].isTuched && !this.state.inputs[2].isValid ? this.state.inputs[2].massage : ''}</p>
                        <div className="new_project_box">
                            <p>Description</p>
                            <Input type="text" className="discrip_inp" onChange={event => this.inputValue(event.target.value, 2)} value={this.state.inputs[2].value} />
                        </div>

                        <div className="create_expenses_box" >
                            <div className="create_expenses">
                                <p> <i className="fas fa-plus" /></p>
                                <p className="create_expenses_tittle">Expenses</p>
                            </div>
                        </div>

                    </div>
                    <div className="new_project">
                        <div className="new_project_box">
                            <p>Supplier</p>
                            <select>
                                <option>
                                    Haymans
                                </option>
                            </select>
                        </div>
                        <p className="error_message">{this.state.inputs[4].isTuched && !this.state.inputs[4].isValid ? this.state.inputs[4].massage : ''}</p>
                        <div className="new_project_box">
                            <p>Materials cost</p>
                            <Input type="text" onChange={event => this.inputValue(event.target.value, 4)} value={this.state.inputs[4].value} />
                        </div>
                        <p className="error_message">{this.state.inputs[5].isTuched && !this.state.inputs[5].isValid ? this.state.inputs[5].massage : ''}</p>
                        <div className="new_project_box">
                            <p>Materials description</p>
                            <Input type="text" onChange={event => this.inputValue(event.target.value, 5)} value={this.state.inputs[5].value} />
                        </div>

                    </div>
                    <Expenses />
                    <Expenses />
                    <div className="newTask_clear"></div>
                    <Save_btn />
                    <div className="newTask_clear"></div>
                </div>
            </div>
        )
    }
}
