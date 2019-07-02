import React from 'react';
import { Dropdown, Header } from 'semantic-ui-react';
import "./project_tests.css";
import Test from "./Test.js";
import { NavLink } from "react-router-dom";
import moment from "moment";





class Projects_tests extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {


    const options = [
      {
        key: 1,
        text: this.props.data.name,
        value: 1,
        content: this.props.data.tasks.length ? this.props.data.tasks.map((item, index) => {
          return (<div key={index} className="taskBox">
                  <Test   name= {item.name} hours={item.hours+ " h"} date={moment(item.taskDate).format('L')} loc={<NavLink to={`/SingleTask/${item._id}`}><p><i className="fas fa-arrow-circle-right" /></p></NavLink>} />
                 </div>)
        }) : "",
      },
    ]
    return (
      <div className="ProjectTests">
        <Dropdown selection fluid options={options} placeholder={this.props.data.name} />
        <NavLink to={`/single_project/${this.props.data._id}`}><p><i className="fas fa-arrow-circle-right" /></p></NavLink>
      </div>
    )
  }
}



export default Projects_tests