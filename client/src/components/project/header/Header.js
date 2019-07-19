import React from 'react';
import './header.css';
import userImg from "../../../assets/img/avatar.jpg";
import { GET } from '../../../core/CRUD';
import { NavLink } from "react-router-dom";



export default class Header extends React.Component {
      constructor(props){
          super(props);
          this.state = {
              userName: "",
              userInfo: ""
          }
      }
      async componentDidMount(){
        let userId = localStorage.getItem('userId');
        let response = await GET(`api/users/${userId}`);
        this.setState({
            userName: response.data.fullName
        })
    }
    render(){
        return(
            <div className="Header">
                    <div className="header_size">
                        <div className="header_size_left">
                            <label htmlFor="input_file">
                                <img src={userImg} />                       
                            <input type="file"  id="input_file" />
                            <div className='image_add'>Add Image</div>
                            </label>
                        </div>
                        <div className="header_size_right">
                            <p className="Employer_Name">{this.state.userName}</p>
                         <NavLink to="/Login"><p className="Employer_info">log out</p></NavLink>   
                        </div>
                    </div>
            </div>
        )
    }
}
