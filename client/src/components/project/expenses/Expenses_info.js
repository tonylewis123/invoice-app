import React from 'react';
import "./expenses.css";
import { POST, GET } from '../../../core/CRUD';
import { Input } from 'semantic-ui-react';



class ExpensesInfo extends React.Component {
    constructor(props) {
        super(props);


         this.state = {
             error: "",
            task : [],
            newSupplier: false,
            newMaterialsCost: false,
            newMaterialsDescription: false
         }
    }

    async componentDidMount() {

        let urlData = window.location.href.split("/");
        let taskId = urlData[urlData.length-1];

        
         let response = await GET(`api/tasks/${taskId}`);
         if (!response.success) {
            if (response.statusCode == 401) {
                return window.location.href = '/login';
            }
            return this.setState({ error: response.error });
        }  
        this.setState({ task: response.data, load: false });    
        
    }

    defaultclick = event => {
        event.stopPropagation();
    }



    editTaskMaterialsCost = () =>{
        this.setState({newMaterialsCost: true})
    }
    editTaskMaterialsDescription = () =>{
        this.setState({newMaterialsDescription: true})
    }
    newTaskMaterialsCost = () =>{
        this.setState({newMaterialsCost: false})
    }
    newTaskMaterialsDescription = () =>{
        this.setState({newMaterialsDescription: false})
    }


    inputValue = (value, index) => {
        this.props.change(value,index,this.props.myIndex)
        let task = this.state.task;  
        if(value !== "" && value !== null){    
            task[index] = value
            this.setState({ task })
        }
        
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
                           {typeof this.props.element !== 'undefined' && this.state.newMaterialsCost ? <Input type="text" placeholder={this.props.element.materialsCost} onChange={event => this.inputValue(event.target.value,'materialsCost')} /> : <p> {this.props.element.materialsCost} </p>}
                            <p> {this.state.newMaterialsCost ? <i className="fas fa-check" onClick={this.newTaskMaterialsCost} /> : <i className="fas fa-pencil-alt" onClick={this.editTaskMaterialsCost} />} </p>
                        </div>
                    </div>

                    <div className="new_project_box">
                        <p>Materials <br /> description</p>
                        <div className="materialsCost">
                            {typeof this.props.element !== 'undefined' && this.state.newMaterialsDescription ? <Input type="text" onChange={event => this.inputValue(event.target.value,'materialsDescription')} placeholder={this.props.element.materialsDescription} /> :<p> {this.props.element.materialsDescription}</p>}
                            <p>   {this.state.newMaterialsDescription? <i className="fas fa-check"  onClick={this.newTaskMaterialsDescription} /> : <i className="fas fa-pencil-alt"  onClick={this.editTaskMaterialsDescription} />} </p>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}



export default ExpensesInfo