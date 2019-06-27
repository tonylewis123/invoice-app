import React from 'react';
import "./expenses.css";




class ExpensesInfo extends React.Component {
    constructor(props) {
        super(props)
    }

    defaultclick = event => {
        // event.preventDefault();
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
                                Haymans
                                </option>
                            <option>
                                Haymans
                                </option>
                        </select>
                    </div>
                    {console.log(this.props)
                    }
                    <div className="new_project_box">
                        <p>Materials cost</p>
                        <div className="materialsCost">
                            <p>{typeof this.props.element !== 'undefined' ? this.props.element.materials_cost : ''}</p>
                            <p><i className="fas fa-pencil-alt" /></p>
                        </div>
                    </div>

                    <div className="new_project_box">
                        <p>Materials description</p>
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