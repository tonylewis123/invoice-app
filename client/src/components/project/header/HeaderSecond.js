import React from 'react';
import './header.css';
import {NavLink} from "react-router-dom";

export default class HeaderSecond extends React.Component {
      constructor(props){
          super(props);
          this.state = {
              userName: "",
              userInfo: ""
          }
      }

    render(){
        return(
            <div className="HeaderSecond">
                    <div className="sec_header_size">
                        <div className="sec_header_size_left">
                            <p className="head_arrow_left">
                                <NavLink to={this.props.loc}><i className="fas fa-arrow-left" /></NavLink>
                                </p>
                        </div>
                        <div className="sec_header_size_right">
                            <p className="sec_head_tittle">{this.props.name}</p>
                        </div>
                    </div>
            </div>
        )
    }
}
