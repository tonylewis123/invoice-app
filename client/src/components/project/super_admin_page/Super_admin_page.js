import React from 'react';
import './super_admin_page.css';
import Header from '../header/Header';
import background from "../../../assets/img/login_bg.png";
import { POST, GET, DELETE } from "../../../core/CRUD"
import { async } from 'q';

export default class Super_admin_page extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        inputs: {
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
        users: [],
        error: ""
    }

   async componentDidMount (){
        let res = await  GET('api/admin/usersList');
        if(!res.success){
           return this.setState({error: res.error}); 
        } 
        this.setState({users: res.data});   
    }

    changeInputHandle = (element, value) => {
        if (element === 'email') {
            let email = this.state.inputs.email;
            email.value = value;
            let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test(value)) {
                email.isTuched = true;
                email.isValid = true
            } else {
                email.isTuched = true;
                email.isValid = false
            }
            this.setState({ email })

        } else if (element === 'name') {
            let name = this.state.inputs.name;
            name.value = value;
            if (value === '' || value === null) {
                name.isTuched = true;
                name.isValid = false
            } else {
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
    createUser = async(data) => {
        let { email, name, role } = data;
        if (!email.value || !name.value || !role.value) {
            return this.setState({ error: 'All fields are required!' });
        }

        let response = await POST('api/admin/create_user', {
            email: email.value,
            role: role.value,
            fullName: name.value
        });
        if(!response.success){
            return this.setState({error: response.error});
        }
        this.setState({users: response.data, error: '', });
    }

    deleteUser = async (userId) => {
        let res = await DELETE('api/admin/delete_user', { userId });
        if(!res.success){
            return this.setState({error: res.error});
        }
        this.setState({
            users: res.data,
            error: ''
        });
    }

    generateListItem = data => {
        return data.map((user, index) => {
            return(
                <tr key = { index } className="user_list">
                  <td>{index + 1}</td>  <td> { user.email }</td> <td> {user.fullName} </td> <td>{ user.role }</td> <td> <button onClick={() => this.deleteUser(user._id)}
                    >delete</button> </td>
                </tr>
            )
        })
    }

    render() {
        let background_page = {
            backgroundImage: `url(${background})`,
        }
        return (
            <div className="Admin_page" style={background_page}>
                <div className="admin_page_size">
                    <Header />
                    {this.state.error? <div>{this.state.error}</div> : null}
                    <div className="sup_admin_clear"></div>
                    <div className="sup_admin_page_search">
                        <p>{this.state.inputs.email.isTuched && !this.state.inputs.email.isValid ? this.state.inputs.email.massage : ''}</p>
                        <input type="text" placeholder="Email" value={this.state.inputs.email.value} onChange={event => this.changeInputHandle('email', event.currentTarget.value)} />
                        <p> {this.state.inputs.name.isTuched && !this.state.inputs.name.isValid ? this.state.inputs.name.massage : ''} </p>
                        <input type="text" placeholder="Full name" value={this.state.inputs.name.value} onChange={event => this.changeInputHandle('name', event.currentTarget.value)} />
                    </div>
                    <div className="admin_page_inputs">
                        <div className="admin_page_inputs_filtr">
                            <input type="radio" name="user" checked value = 'employer' onChange = { this.radioInputChange.bind(this, 'employer') }/>
                            <p>Employee</p>
                        </div>
                        <div className="admin_page_inputs_filtr admin_page_inputs_filtr_2">
                            <input type="radio" name="user" value = 'admin' onChange = { this.radioInputChange.bind(this, 'admin') } />
                            <p>Admin</p>
                        </div>
                    </div>
                    <div className="add_new_project_btn">
                        <button onClick={async () => this.createUser(this.state.inputs)} >Create</button>
                    </div>
                    <div  className="user_table_content">
                    <table className="users_list">
                        <thead>
                            <tr>
                                <th>N</th>
                                <th>Email</th>
                                <th>Fullname</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.users.length > 0 ? this.generateListItem(this.state.users) : "" }
                        </tbody>
                    </table>
                    </div>
                    <div className="sup_admin_clear"></div>
                </div>
            </div>
        )
    }
    
}