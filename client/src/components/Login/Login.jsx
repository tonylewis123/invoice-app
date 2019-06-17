import React from 'react';
import './login.css';
import logo from "../../assets/img/logo.png";
import loginBg from "../../assets/img/login_bg.png";
import {Route, NavLink} from "react-router-dom";
import { POST } from '../../core/CRUD';

export default class Login extends React.Component {
      constructor(props){
          super(props);
          this.state = {
            inputs:[
                {
                    label: "Email",
                    type: "email",
                    isTuched: false,
                    isValid: false,
                    value: "",
                    validation: {
                        required: true,
                        email: true
                    },
                    massage:'Please enter valid email!'
                },
                {
                    label: "Password",
                    type: "password",
                    isTuched: false,
                    isValid: false,
                        value: "",
                    validation: {
                        required: true
                    },
                    massage:'Please enter valid password!'
                }
            ],
            error: ""
          }
      }

      
    onChangeInp = (value,index) => {
        const inputs = this.state.inputs
        const input = inputs[index];
        input.value = value;
        input.isTuched = true;
        Object.keys(input.validation).map((elm)=>{
            if(elm == "required"){
                if(value == "" || value == null){
                    input.isValid = false;
                }
                else{
                    input.isValid = true
                }

            }else if (elm == "email"){
                let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(re.test(value)){
                    input.isValid = true;
                }
                else{
                    input.isValid = false
                }
            }
        })
        this.setState({
            inputs
        })
    }

    loginUser = async data => {
      let email = data[0].value;
      let password = data[1].value;

      if(email && password){
        try {
          let response = await POST('api/auth/login', { email, password });
          if(response.success){
            localStorage.setItem('userId', response.data.id);
            localStorage.setItem('userToken', response.data.token);
            window.location.href = '/Project';
          } else {
            this.setState({error: response.error});
          }
        } catch (error) {
          this.setState({
            error: error.message
          });
        }
      } else {
        this.setState({
          error: 'Username or password is empty!'
        });
      }
    }

     loginStyle = {
        backgroundImage: `url(${loginBg})`,
      }
    render(){
    
        return(
            <div className="Login" style={this.loginStyle}>
                <div className="login_size">
                <div className="login_top">
                    <img src={logo} />
                </div>
                <div className="login_inputs">
                  {this.state.inputs.map((elm, index)=>{
                      return(
                          <>
                          <p className="error_message">{elm.isTuched && !elm.isValid?elm.massage:''}</p>
                          <input key={index} type={elm.type} value={elm.value} onChange={event=>this.onChangeInp(event.target.value,index)} placeholder={elm.label} />
                          </>
                      )
                  })}
                <button onClick={() => this.loginUser(this.state.inputs)}>Login</button>
                </div>
                </div>
            </div>
        )
    }
}
