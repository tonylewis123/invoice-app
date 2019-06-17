import React from 'react';
import { Dropdown, Header } from 'semantic-ui-react';
import "./project_tests.css";
import Test from "./test.js"


const options = [
  {
    key: 1,
    text: 'Second Test Project(1)',
    value: 1,
    content: <Test  content='Second Test Project' subheader='12.11' />,
  },
  {
    key: 2,
    text: 'Thired Test Project(2)',
    value: 2,
    content: <Test content='Tablet' subheader='Thired Test Project(2)' />,
  },
  {
    key: 3,
    text: 'Fourth Test Project(3)',
    value: 3,
    content: <Test  content='Desktop' subheader='Fourth Test Project(3)' />,
  },
]

const Projects_tests = () => (
    <div>
        <Dropdown selection fluid options={options} placeholder='Projects' />
    </div>
)

export default Projects_tests