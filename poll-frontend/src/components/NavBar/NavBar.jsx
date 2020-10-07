import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./style.scss";
const NavBar = () => {
    const [checked, setChecked] = useState(false);
    const handleChecked = () => {
        setChecked((intial) => !intial);
    };
    return (
        <div className="nav-container">
            <div className="menu-container">
                <input
                    type="checkbox"
                    id="menu-toggle"
                    checked={checked}
                    onChange={() => {}}
                />
                <label
                    id="trigger"
                    htmlFor="menu-toggle"
                    onClick={handleChecked}
                ></label>
                <label
                    id="burger"
                    htmlFor="menu-toggle"
                    onClick={handleChecked}
                ></label>
                <ul id="menu">
                    <li onClick={handleChecked}>
                        <NavLink to="/login">Login</NavLink>
                    </li>
                    <li onClick={handleChecked}>
                        <NavLink to="/signup">SignUp</NavLink>
                    </li>
                    <li onClick={handleChecked}>
                        <NavLink to="/dashboard">Dashboard</NavLink>
                    </li>
                    <li onClick={handleChecked}>
                        <NavLink to="/create-poll">New Poll</NavLink>
                    </li>
                    <li onClick={handleChecked}>
                        <NavLink to="/vote">Vote</NavLink>
                    </li>
                    <li onClick={handleChecked}>
                        <NavLink to="/logout">Logout</NavLink>
                    </li>
                </ul>
            </div>
            <div className="logo">
                <Link to="/">
                    <h1>POll</h1>
                </Link>
            </div>
        </div>
    );
};

export default NavBar;
