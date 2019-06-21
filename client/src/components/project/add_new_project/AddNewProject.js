import React from 'react';
import './AddNewProject.css';
import HeaderSecond from '../header/HeaderSecond';
import background from "../../../assets/img/login_bg.png";
import Projects_tests from "../project_tests/Projects_tests";
import { NavLink } from "react-router-dom";
import { Input } from 'semantic-ui-react';
import Next_btn from "../next_btn/Next_btn";
import Save_btn from "../save_btn/Save_btn";
import { POST } from '../../../core/CRUD';
import { async } from 'q';


export default class AddNewProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: [
                {
                    label: "Project Name",
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
                    label: "Project Date",
                    isTuched: false,
                    isValid: false,
                    value: "",
                    validation: {
                        required: true,
                        email: true
                    },
                    massage: 'Please enter date'
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
                }
            ],
            error: ""
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
    saveProject = async (data) => {
        let name = data[0].value;
        let date = data[1].value;
        let description = data[1].value;

        if (!name.value || !date.value || !description.value) {
            return this.setState({ error: 'All fields are required!' });
        }

        let response = await POST('api/auth/login', {
            name: name.value,
            date: date.value,
            description: description.value
        });
        
        if(!response.success){
            return this.setState({error: response.error});
        }
        name.value = '';
        description.value = '';
        this.setState({ error: '',inputs:data });
    }
    render() {
        let background_page = {
            backgroundImage: `url(${background})`,
        }
        var curr = new Date();
        curr.setDate(curr.getDate() + 3);
        var date = curr.toISOString().substr(0, 10);
        return (
            <div className="Admin_page" style={background_page}>
                <div className="admin_page_size">
                    <HeaderSecond name="New Project" loc="/Admin_page" />
                    <div className="new_project">
                        <div className="new_project_box">
                            <p>Project Name{console.log(this.state.inputs[0].isValid)}</p>
                            <Input type="text" onChange={event => this.inputValue(event.target.value, 0)} />
                        </div>
                        <p className="error_message">{this.state.inputs[0].isTuched && !this.state.inputs[0].isValid ? this.state.inputs[0].massage : ''}</p>
                        <div className="new_project_box">
                            <p>Project Date</p>
                            <Input type="date" defaultValue={date} onChange={event => this.inputValue(event.target.value, 1)} />
                        </div>
                        <p className="error_message">{this.state.inputs[1].isTuched && !this.state.inputs[1].isValid ? this.state.inputs[1].massage : ''}</p>
                        <div className="new_project_box">
                            <p>Description</p>
                            <Input type="text" className="discrip_inp" onChange={event => this.inputValue(event.target.value, 2)} />
                        </div>
                        <p className="error_message">{this.state.inputs[2].isTuched && !this.state.inputs[2].isValid ? this.state.inputs[2].massage : ''}</p>
                    </div>
                    <div className="addNewPrClear_top" >
                        <Save_btn btnClick={() => this.saveProject(this.state.inputs)} />
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
