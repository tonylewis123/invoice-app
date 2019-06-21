import React from 'react';
import './save_btn.css';

export default  props => {
        return(
            <div className="next_btn_div">
            <button onClick={props.btnClick} className="next_btn">Save </button>
            </div>
        )
}