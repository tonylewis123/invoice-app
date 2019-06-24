import React from 'react';
import { Dropdown, Header } from 'semantic-ui-react';
import "./project_tests.css";
import Test from "./test.js"


const options = [
  {
    key: 1,
    text: 'Second Test Project(1)',
    value: 1,
    
    content: <Test  content='task empty' subheader='12.11' />,
  },
]

const Projects_tests = (props) => (
    <div className="ProjectTests">
        <Dropdown selection fluid options={options} placeholder={props.name} />
    </div>
)

export default Projects_tests