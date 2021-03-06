import React from 'react';
import { Dropdown, Header } from 'semantic-ui-react';
import "./expenses.css";
import {NavLink} from "react-router-dom";
import ExpensesInfo from "./Expenses_info";
 




class Expenses extends React.Component  {
      constructor(props){
        super(props);
        this.state = {
          ExpensesName: "Expenses",
          
        }
      }
      render(){ 
        console.log(this.props.myIndex);
        
        
        const options = [
          {
            key: 1,
            text: this.state.ExpensesName,
            value: 1,
            content: <ExpensesInfo myIndex={this.props.myIndex} change={this.props.change} element={this.props.element} />,
          },
        ]
        return(
          <div className="Expenses">
          <Dropdown selection fluid options={options} placeholder={this.props.element.expId>1 ? this.state.ExpensesName + " (" + this.props.element.expId  + ")"  : this.state.ExpensesName  } />
       </div>
        )
      }
      
}



export default Expenses