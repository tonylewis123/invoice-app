import React from 'react';
import './AddNewProject.css';
import HeaderSecond from '../header/HeaderSecond';
import background from "../../../assets/img/login_bg.png";
import Projects_tests from "../project_tests/Projects_tests";
import { NavLink } from "react-router-dom";
import { Input } from 'semantic-ui-react';
import Next_btn from "../next_btn/Next_btn";
import Prev_btn from "../next_btn/Prev_btn";
import Save_btn from "../save_btn/Save_btn";
import { POST, GET } from '../../../core/CRUD';
import moment from "moment";
import Load from "../../../assets/img/Load.gif"

var curr = new Date();
curr.setDate(curr.getDate());
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
                    value: curr.toISOString().substr(0, 10),
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
            error: "",
            projects: [],
            load: true,
            count: 0,
            view: 4,
        }
    }

    async componentDidMount() {
        let userId = localStorage.getItem('userId');
        if (!userId) {
            return window.location.href = '/login';
        }
        let response = await GET(`api/users/${userId}`);
        if (!response.success) {
            if (response.statusCode == 401) {
                return window.location.href = '/login';
            }
            return this.setState({ error: response.error });
        }
        this.setState({ projects: response.data.projects.reverse(), load: false });
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
        this.setState({ inputs, error: "" })

    }
    saveProject = async () => {
        let inputs = [...this.state.inputs];
        let name = inputs[0].value;
        let date = inputs[1].value;
        let description = inputs[2].value;
        this.setState({load:true})
        if (name === '' || date === '' || description === '') {
            return this.setState({ error: 'All fields are required!', load:false});
        }

        let response = await POST('api/users/createProject', {
            name: name,
            date: date,
            description: description
        });

        console.log(response.data.projects);

        if (!response.success) {
            return this.setState({ error: response.error});
        }
        name = '';
        description = '';
        this.setState({ projects: response.data.projects.reverse(), error: '', inputs, load: false });
        console.log(this.state.projects);
    }

    generateProjectsItem = () => {
        let projects = this.state.projects
        return projects.slice(this.state.count * this.state.view, (this.state.count + 1) * this.state.view).map((item, index) => {
            return (
                <div key={index}>
                    <div className="project_info">
                        <p>{moment(item.created_at).format('L')}</p>
                        <p>{item.projectId}</p>
                        
                    </div>
                    <Projects_tests data={item}  />
                </div>
            )
        })
    }
    changeNextPageHandle = () => {
        
        // if((this.state.count + 1) * this.state.view >= this.state.projects.length-1){
        //     return
        // }
        this.setState({
            count:this.state.count + 1
        })
        console.log(this.state.count * this.state.view)
    }

    changePrevPageHandle = () => {
        // if(this.state.count <= 0){
        //     return
        // }
        this.setState({
            count:this.state.count - 1
        })
        console.log(this.state.projects)
    }
    render() {
        let background_page = {
            backgroundImage: `url(${background})`,
        }

        return (
            <div className="Admin_page" style={background_page}>
                  { this.state.load ? <img src={Load}  className="loading" /> : null }
                <div className="admin_page_size" style={this.state.load?{opacity:.2}:{}}>
                    <HeaderSecond name="New Project" loc="/Project" />
                    <div className="new_project">
                        <div className="new_project_box">
                            <p>Project Name</p>
                            <Input type="text" onChange={event => this.inputValue(event.target.value, 0)} value={this.state.inputs[0].value} />
                        </div>
                        <p className="error_message">{this.state.inputs[0].isTuched && !this.state.inputs[0].isValid ? this.state.inputs[0].massage : ''}</p>
                        <div className="new_project_box">
                            <p>Project Date</p>
                            <Input type="date" defaultValue={this.state.inputs[1].value} onChange={event => this.inputValue(event.target.value, 1)} />
                        </div>
                        <p className="error_message">{this.state.inputs[1].isTuched && !this.state.inputs[1].isValid ? this.state.inputs[1].massage : ''}</p>
                        <div className="new_project_box">
                            <p>Description</p>
                            <Input type="text" className="discrip_inp" onChange={event => this.inputValue(event.target.value, 2)} value={this.state.inputs[2].value} />
                        </div>
                        <p className="error_message">{this.state.inputs[2].isTuched && !this.state.inputs[2].isValid ? this.state.inputs[2].massage : ''}</p>
                    </div>
                    <div className="addNewPrClear_top" >
                        <p className="error_message">{this.state.error}</p>
                        <div className="addNPClear"></div>
                        <Save_btn btnClick={this.saveProject} />
                    </div>
                    {this.state.projects.length > 0 ? this.generateProjectsItem() : ""}

  

                </div>
            </div>
        )
    }
}
