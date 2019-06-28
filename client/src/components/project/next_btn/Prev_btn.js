import React from 'react';
import './next_btn.css';

export default function Prev_btn(props){
        return(
            <div className="next_btn_div">
            <button onClick={props.onClick} className="next_btn"><i className="fas fa-arrow-left" />prev</button>
            </div>
        )
}