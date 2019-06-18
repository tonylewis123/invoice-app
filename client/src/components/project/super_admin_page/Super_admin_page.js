import React from 'react';
import './super_admin_page.css';
import Header from '../header/Header';
import background from "../../../assets/img/login_bg.png";
import { POST } from "../../../core/CRUD"

export default class Super_admin_page extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        inputs:{
            email: {
                value: '',
                isTuched: false,
                isValid: false,
                massage: 'Please enter valid email!',
            },
            name: {
                value: '',
                isTuched: false,
                isValid: false,
                massage: 'Please enter name',
            },
            role: {
                value: "employer"
            },
        },
        users:[],
        issetUsers : false
       
    }
        
    changeInputHandle = (element, value) => {
        if (element === 'email') {
            let email = this.state.inputs.email;
            email.value = value;
            let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test(value)) {
                email.isTuched = true;
                email.isValid = true
            }
            else {
                email.isTuched = true;
                email.isValid = false
            }
            this.setState({ email })

        }
        else if (element === 'name') {
            let name = this.state.inputs.name;
            name.value = value;
            if (value === '' || value === null) {
                name.isTuched = true;
                name.isValid = false
            }
            else {
                name.isTuched = true;
                name.isValid = true
            }
            this.setState({ name })

        }
    }

    radioInputChange = name => {
        let role = this.state.inputs.role;
        role.value = name;
        this.setState({ role })
    }
    createUser = async (data) => {
        let { email, name, role } = data;
        if (!email.value || !name.value || !role.value) {
            return this.setState({ error: 'All fields are required!' });
        }
        else{
            const users = this.state.users;
            users.push(this.state.inputs);
            this.setState({users,issetUsers:true})
        }
            
        
        // let response = await POST('api/admin/create_user', {
        //     email: email.value,
        //     role: role.value,
        //     fullName: name.value
        // });
        // console.log(response, '===============');
    }
  
    render() {
        let background_page = {
            backgroundImage: `url(${background})`,
        }
        return (
            <div className="Admin_page" style={background_page}>
                <div className="admin_page_size">
                    <Header />
                    <div className="add_new_project_btn">
                        <button onClick={async () => this.createUser(this.state.inputs)}>Create</button>
                    </div>
                    <div className="admin_page_inputs">
                        <div className="admin_page_inputs_filtr">
                            <input onChange={this.radioInputChange.bind(this, 'employer')} type="radio" name="user"  value='employer' />
                            <p>Employee</p>
                        </div>
                        <div className="admin_page_inputs_filtr admin_page_inputs_filtr_2">
                            <input onChange={this.radioInputChange.bind(this, 'admin')} type="radio" name="user" value='admin' />
                            <p>Admin</p>
                        </div>
                    </div>
                    <div className="admin_page_search">
                        <p>{this.state.inputs.email.isTuched && !this.state.inputs.email.isValid ? this.state.inputs.email.massage : ''}</p>
                        <input type="text" placeholder="Email" value={this.state.inputs.email.value} onChange={event => this.changeInputHandle('email', event.target.value)} />
                        <p>{this.state.inputs.name.isTuched && !this.state.inputs.name.isValid ? this.state.inputs.name.massage : ''}</p>
                        <input type="text" placeholder="Full name" value={this.state.inputs.name.value} onChange={event => this.changeInputHandle('name', event.target.value)} />
                    </div>
                    <ul></ul>
                   {this.state.issetUsers?this.state.users.map((elem,index)=>{
                     
                        return(
                            <li key={index}> <span>{elem.email.value}</span> <span>{elem.name.value}</span> <span>{elem.role.value}</span> </li>
                        )
                   }):''}
                

                </div>
            </div>
        )
    }
}
