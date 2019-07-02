import React from 'react';
import './page1.css';
import Header from '../header/Header';
import background from "../../../assets/img/login_bg.png";
import Projects_tests from "../project_tests/Projects_tests";
import { POST, GET } from '../../../core/CRUD';
import moment from "moment";
import Load from "../../../assets/img/Load.gif";
import Next_btn from "../next_btn/Next_btn";
import Prev_btn from "../next_btn/Prev_btn";


export default class Page1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        console.log(response);
        if (!response.success) {
            if (response.statusCode == 401) {
                return window.location.href = '/login';
            }
            return this.setState({ error: response.error });
        }
        this.setState({ projects: response.data.projects.reverse(), load: false });
    }
    generateProjectsItem = () => {
        let projects = this.state.projects;
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
        console.log(this.state.projects);
        
        let background_page = {
            backgroundImage: `url(${background})`,
        }
        return (
            <div className="Page1" style={background_page}>
                 { this.state.load ? <img src={Load}  className="loading" /> : null }
                <div className="page1_size" style={this.state.load?{opacity:.2}:{} }>
                    <Header />
                    {this.state.projects.length > 0 ? this.generateProjectsItem() : ""}
                    {/* <div className="page1_clear_top"></div> */}
                    <div className="admin_p_clear_top">
                        {this.state.count>0 && <Prev_btn onClick={this.changePrevPageHandle} />}
                        {(this.state.count + 1) * this.state.view <= this.state.projects.length-1 && <Next_btn onClick={this.changeNextPageHandle} />}
                    </div>

                </div>
            </div>
        )
    }
}
