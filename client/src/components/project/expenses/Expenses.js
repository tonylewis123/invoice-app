import React from 'react';
import { Dropdown, Header } from 'semantic-ui-react';
import "./expenses.css";
import {NavLink} from "react-router-dom";
import ExpensesInfo from "./Expenses_info"
 




class Expenses extends React.Component  {
      constructor(props){
        super(props);
      }
      render(){ 
        const options = [
          {
            key: 1,
            text: "1234",
            value: 1,
            content: <ExpensesInfo />,
          },
        ]
        return(
          <div className="Expenses">
          <Dropdown selection fluid options={options} placeholder="expenses" />
       </div>
        )
      }
      
}



export default Expenses