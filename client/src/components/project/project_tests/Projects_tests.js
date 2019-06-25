import React from 'react';
import { Dropdown, Header } from 'semantic-ui-react';
import "./project_tests.css";
import Test from "./test.js";
import {NavLink} from "react-router-dom";
 




class Projects_tests extends React.Component  {
      constructor(props){
        super(props);
      }
      render(){
        console.log(this.state);
        
        const options = [
          {
            key: 1,
            text: this.props.data.name,
            value: 1,
            content: <Test  content='task empty' subheader='12.11' />,
          },
        ]
        return(
          <div className="ProjectTests">
          <Dropdown selection fluid options={options} placeholder={this.props.data.name} />
          <NavLink to={`/single_project/${this.props.data._id}`}><p><i className="fas fa-arrow-circle-right" /></p></NavLink>
       </div>
        )
      }
      
}



export default Projects_tests