import React from 'react';
import "./project_tests.css";



class Test extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        console.log(this.props, "props");
        
        return(
            <div>
                <p className="text_tittle">no task</p>
                <div className="test_flex">
                <p>{this.props.name}</p>
                <p>{this.props.data}</p>
                </div>
            </div>
        )
    }
}



export default Test