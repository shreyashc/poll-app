import React from "react";
import "./style.scss";
const About = () => {
    return (
        <div className="about-container">
            <div className="about">
                <h1 className="head item"> Poll App</h1>
                <div className="text item">
                    A platform to create and manage poll,view results and more.
                </div>
                <div className="owner">
                    <div className="hc">&copy; SHREYAS H C</div>
                    <div className="social">
                        <a href="https://github.com/shreyashc">
                            <i className="fab fa-github"></i>
                        </a>
                        <a href="mailto:shreyashc018@gmail.com">
                            <i className="fas fa-envelope"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
