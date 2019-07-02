import React from 'react';
import "./project_tests.css";



class Test extends React.Component{
    constructor(props){
        super(props);
    }

    render(){

        
        return(
            <div>
                <p className="text_tittle">{this.props.name}</p>
                <div className="test_flex">
                <p>{this.props.date}</p>
                <p>{this.props.hours}</p>
                <div> {this.props.loc} </div>

                </div>
            </div>
        )
    }
}



export default Test