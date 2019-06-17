import React from 'react';
import Page1 from "./page1/Page1";
import Admin_page from "./admin_page/Admin_page";
import Super_admin_page from "./super_admin_page/Super_admin_page";
import { GET } from '../../core/CRUD';
import { log } from 'util';





export default class Project extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: ''
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
        if(response.data.role === "employer"){
            return window.location.href = '/page1';
        }
        else if(response.data.role === "admin"){
            return window.location.href = '/admin_page';   
        }
        else if(response.data.role === "superadmin"){
            return window.location.href = '/super_admin_page';   
        }
    }

    render(){
        return(
            <div className="project">
             
            </div>
        )
    }
}