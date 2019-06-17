import React from 'react';
import './page1.css';
import Header from '../header/Header';
import background from "../../../assets/img/login_bg.png";
import Projects_tests from "../project_tests/Projects_tests"


export default class Page1 extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let background_page = {
            backgroundImage: `url(${background})`,
        }
        return (
            <div className="Page1" style={background_page}>
                <div className="page1_size">
                    <Header />
                    <Projects_tests />
                    <div className="next_btn_div">
                    <button className="next_btn">next <i className="fas fa-arrow-right" /> </button>
                    </div>

                </div>
            </div>
        )
    }
}
