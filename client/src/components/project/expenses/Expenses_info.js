import React from 'react';
import "./expenses.css";




class ExpensesInfo extends React.Component {

    defaultclick = event => {
        // event.preventDefault();
        event.stopPropagation();
    }

    render() {
        return (
            <div className="ExpensesInfo">
                <div className="new_project" onClick={event=>this.defaultclick(event)}>
                    <div className="new_project_box">
                        <p>Supplier</p>
                        <select >
                            <option>
                                Haymans
                                </option>
                            <option>
                                Haymans
                                </option>
                        </select>
                    </div>

                    <div className="new_project_box">
                        <p>Materials cost</p>
                        <div className="materialsCost">
                            <p>10</p>
                            <p><i className="fas fa-pencil-alt" /></p>
                        </div>
                    </div>

                    <div className="new_project_box">
                        <p>Materials description</p>
                        <div className="materialsCost">
                            <p>Some Mats1</p>
                            <p ><i className="fas fa-pencil-alt" /></p>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}



export default ExpensesInfo