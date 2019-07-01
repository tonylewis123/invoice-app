import React from 'react';
import './admin_page.css';
import Header from '../header/Header.js';
import background from "../../../assets/img/login_bg.png";
import Projects_tests from "../project_tests/Projects_tests";
import Next_btn from "../next_btn/Next_btn";
import Prev_btn from "../next_btn/Prev_btn";
import { NavLink } from "react-router-dom";
import { POST, GET } from '../../../core/CRUD';
import moment from "moment";
import Load from "../../../assets/img/Load.gif"



export default class Admin_page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            project: [],
            filter: 'projectId',
            val: "",
            count: 0,
            view: 4,
            load: true
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
        this.setState({
            projects: response.data.projects.reverse(),
            project: response.data.projects.reverse(),
            load: false
        });
 
    }
    generateProjectsItem = () => {
        const projects = this.state.projects;
        // const newP = projects.splice(this.state.page, this.state.limit);
        
        return projects.slice(this.state.count * this.state.view, (this.state.count + 1) * this.state.view).map((item, index) => {
            return (
                <div key={index}>
                    <div className="project_info">
                        <p>{moment(item.created_at).format('L')}</p>
                        <p>{item.projectId}</p>

                    </div>
                    <Projects_tests data={item} />
                </div>
            )
        })
    }
    filterProject = (val) => {
        // console.log(radio.checked);
        let arr = this.state.projects.filter(item => {
            console.log(item.name, 'item')
            //    whiteList.indexOf(event.type) > -1
            return item.name.indexOf(val) > -1
        })
        console.log(this.state.projects)
        if (val == "") {
            this.setState({ projects: this.state.project })
        } else {
            this.setState({ projects: arr })
        }

    }
    sortProject = (el, name) => {
        console.log(el.checked);
        if (el.checked) {
            let projects = this.state.projects;
           
            projects.sort((a, b) => {

                if (a[name].toLowerCase() < b[name].toLowerCase()) {
                    return -1;
                }
                if (a[name].toLowerCase() > b[name].toLowerCase()) {
                    return 1;
                }
                return 0;
            })
            this.setState({ projects })
        }


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
        console.log(this.state.projects)
        return (
            <div className="Admin_page" style={background_page}>
                                 { this.state.load ? <img src={Load}  className="loading" /> : null }
                <div className="admin_page_size" style={this.state.load?{opacity:.2}:{} }>
                    <Header />

                    <div className="add_new_project_btn">

                        <NavLink to={"/NewProject"}> <button><i className="fas fa-plus" /> Add new project</button> </NavLink>
                    </div>
                    <div className="admin_page_inputs">
                        <div className="admin_page_inputs_filtr">
                            <input type="radio" name="checkbox" onChange={event => this.sortProject(event.target, 'created_at')} />
                            <p>DD/MM/YY</p>
                        </div>
                        <div className="admin_page_inputs_filtr admin_page_inputs_filtr_2">
                            <input type="radio" name="checkbox" onChange={event => this.sortProject(event.target, 'projectId')} />
                            <p>Project ID</p>
                        </div>
                    </div>
                    <div className="admin_page_search">
                        <input type="text" onChange={(event) => this.setState({ val: event.target.value })} />
                        <button onClick={event => this.filterProject(this.state.val)}><i className="fas fa-search" /></button>
                    </div>

                    {this.state.projects.length > 0 ? this.generateProjectsItem() : ""}

                    <div className="admin_p_clear_top">
                        {this.state.count>0 && <Prev_btn onClick={this.changePrevPageHandle} />}
                        {(this.state.count + 1) * this.state.view <= this.state.projects.length-1 && <Next_btn onClick={this.changeNextPageHandle} />}
                    </div>
                    <div>
                       
                    </div>

                </div>
            </div>
        )
    }
}
