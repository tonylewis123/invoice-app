render() {
    let background_page = {
        backgroundImage: `url(${background})`,
    }
    return (
        <div className="Admin_page" style={background_page}>
            <div className="admin_page_size">
                <Header />
                <div className="sup_admin_clear"></div>
                <div className="admin_page_search">
                    <p>{this.state.inputs.email.isTuched && !this.state.inputs.email.isValid ? this.state.inputs.email.massage : ''}</p>
                    <input type="text" placeholder="Email" value={this.state.inputs.email.value} onChange={event => this.changeInputHandle('email', event.target.value)} />
                    <p> {this.state.inputs.name.isTuched && !this.state.inputs.name.isValid ? this.state.inputs.name.massage : ''} </p>
                    <input type="text" placeholder="Full name" value={this.state.inputs.name.value} onChange={event => this.changeInputHandle('name', event.target.value)} />
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
                <ul>
                {this.state.issetUsers ? this.state.users.map((elem, index) => {
                   return ( 
                        <li key = { index }> <span>{ elem.email.value } </span> <span>{elem.name.value}</span > <span> { elem.role.value } </span></li>
                         )
                              }) : ''
                            }

                </ul>
            </div>
        </div>
    )
}