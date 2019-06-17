import React from 'react';
import './header.css';
import userImg from "../../../assets/img/user1.png";


export default class Header extends React.Component {
      constructor(props){
          super(props);
         
      }
    render(){
        return(
            <div className="Header">
                    <div className="header_size">
                        <div className="header_size_left">
                            <img src={userImg} />
                        </div>
                        <div className="header_size_right">
                            <p className="Employer_Name">Employer Name</p>
                            <p className="Employer_info">lorem ipsum dolor</p>
                        </div>
                    </div>
            </div>
        )
    }
}
