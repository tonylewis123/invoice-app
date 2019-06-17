import React from 'react';
import './header.css';
import userImg from "../../../assets/img/user1.png";
import { GET } from '../../../core/CRUD';


export default class Header extends React.Component {
      constructor(props){
          super(props);
          this.state = {
              userName: "",
              userInfo: "lorem ipsum dolor"
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
                            <img src={userImg} />
                        </div>
                        <div className="header_size_right">
                            <p className="Employer_Name">{this.state.userName}</p>
                            <p className="Employer_info">{this.state.userInfo}</p>
                        </div>
                    </div>
            </div>
        )
    }
}
