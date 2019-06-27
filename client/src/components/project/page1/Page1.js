import React from 'react';
import './page1.css';
import Header from '../header/Header';
import background from "../../../assets/img/login_bg.png";
import Projects_tests from "../project_tests/Projects_tests";
import { POST, GET } from '../../../core/CRUD';
import moment from "moment";


export default class Page1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
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
        this.setState({ projects: response.data.projects.reverse() });
    }
    generateProjectsItem = data => {
        return data.map((item, index) => {
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

    render() {
        console.log(this.state.projects);
        
        let background_page = {
            backgroundImage: `url(${background})`,
        }
        return (
            <div className="Page1" style={background_page}>
                <div className="page1_size">
                    <Header />
                    {this.state.projects.length > 0 ? this.generateProjectsItem(this.state.projects) : ""}
                    <div className="page1_clear_top"></div>
                    <div className="next_btn_div">
                    <button className="next_btn">next <i className="fas fa-arrow-right" /> </button>
                    </div>

                </div>
            </div>
        )
    }
}
