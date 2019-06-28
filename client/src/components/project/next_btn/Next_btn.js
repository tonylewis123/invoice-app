import React from 'react';
import './next_btn.css';

export default function Next_btn(props){
        return(
            <div className="next_btn_div">
            <button onClick={props.onClick} className="next_btn">next <i className="fas fa-arrow-right" /> </button>
            </div>
        )
}