import React from 'react';
import Page1 from "./page1/Page1";
import Admin_page from "./admin_page/Admin_page";
import Super_admin_page from "./super_admin_page/Super_admin_page";
import { GET } from '../../core/CRUD';
import { log } from 'util';
import Load from "../../assets/img/Load.gif"





export default class Project extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: '',
            user: '',
            load: true
        };
    }


    async componentDidMount(){
        let userId = localStorage.getItem('userId');
        if(!userId){
            return window.location.href = '/login';
        }
        let response = await GET(`api/users/${userId}`);
        if(!response.success){
            if(response.statusCode == 401){
                return window.location.href = '/login';
            }
            return this.setState({error: response.error});
        }
        this.setState({user: response.data, load: false});
    }

    renderDashboard = user => {
        if(user.role && user.role === 'employee'){
          return (<Page1 user={user}/>);
        }
        if(user.role && user.role === 'superadmin'){
          return (<Super_admin_page user={user}/>);
        }
        if(user.role && user.role === 'admin'){
          return (<Admin_page user={user}/>);
        }
      }

    render(){
        return(
            <div className="project">
            
                { this.state.load ? <img src={Load}  className="loading" /> : null }
               <div>
               { this.state.user ? this.renderDashboard(this.state.user) : null }
               </div>
            </div>
        )
    }
}