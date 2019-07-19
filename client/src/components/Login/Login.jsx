import React from 'react';
import './login.css';
import logo from "../../assets/img/logo.png";
import loginBg from "../../assets/img/login_bg.png";
import {Route, NavLink} from "react-router-dom";
import { POST } from '../../core/CRUD';
import Load from "../../assets/img/Load.gif"

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
            error: "",
            load: false
          }
      }

      
    onChangeInp = (value,index) => {
        const inputs = this.state.inputs
        const input = inputs[index];
        input.value = value;
        input.isTuched = true;
        Object.keys(input.validation).map((elm, index)=>{
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
            inputs,
            error: ""
        })
    }

    loginUser = async data => {
      let email = data[0].value;
      let password = data[1].value;

      if(email && password){
        this.setState({load:true})
        try {
          let response = await POST('api/auth/login', { email, password });
          if(response.success){
            localStorage.setItem('userId', response.data.id);
            localStorage.setItem('userToken', response.data.token);
            window.location.href = '/Project';
          } else {
            this.setState({ load:false, error: response.error });
          }
        } catch (error) {
          console.log(error,"errrrrrrr");
          
          this.setState({
            error: error.message,
            load: false
          });
        }
      } else {
        this.setState({
          error: 'Username or password is empty!',
          load: false
        });
      }
    }

     loginStyle = {
        backgroundImage: `url(${loginBg})`,
      }
    render(){
    
        return(
            <div className="Login" style={this.loginStyle}>
              { this.state.load ? <img src={Load}  className="loading" /> : null }
                <div className="login_size" style={this.state.load?{opacity:.2}:{} } >
                <div className="login_top">
                    <img src={logo} />
                </div>
                <div className="login_inputs">
                <p className="error_message">{this.state.error}</p>
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
