import React from 'react';
import "./expenses.css";
import { POST, GET } from '../../../core/CRUD';



class ExpensesInfo extends React.Component {
    constructor(props) {
        super(props);


         this.state = {
             error: "",
             project: {},
         }
    }

    async componentDidMount() {
        let urlData = window.location.href.split("/");
        let projectId = urlData[urlData.length-2];
        
         let response = await GET(`api/projects/${projectId}`);
         if (!response.success) {
            if (response.statusCode == 401) {
                return window.location.href = '/login';
            }
            return this.setState({ error: response.error });
        }
        
        this.setState({ project: response.data });
        console.log(response);
           
        
    }

    defaultclick = event => {
        event.stopPropagation();
    }

    render() {
        return (
            <div className="ExpensesInfo">
                <div className="new_project" onClick={event => this.defaultclick(event)}>
                    <div className="new_project_box">
                        <p>Supplier</p>
                        <select >
                            <option>
                            {typeof this.props.element !== 'undefined' ? this.props.element.supplier : ''}
                                </option>
                            <option>
                                2
                                </option>
                            <option>
                                3
                                </option>
                        </select>
                    </div>
                   
                    
                    <div className="new_project_box">
                        <p>Materials <br /> cost</p>
                        <div className="materialsCost">
                            <p>{typeof this.props.element !== 'undefined' ? this.props.element.materials_cost : ''}</p>
                            <p><i className="fas fa-pencil-alt" /></p>
                        </div>
                    </div>

                    <div className="new_project_box">
                        <p>Materials <br /> description</p>
                        <div className="materialsCost">
                            <p>{typeof this.props.element !== 'undefined' ? this.props.element.materials_description : ''}</p>
                            <p ><i className="fas fa-pencil-alt" /></p>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}



export default ExpensesInfo