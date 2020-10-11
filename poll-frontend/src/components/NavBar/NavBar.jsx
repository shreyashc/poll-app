import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import Logout from "../Logout/Logout";
import { AuthContext } from "../../contexts/AuthContext";
import "./style.scss";

const NavBar = () => {
    const [open, setOpen] = useState(false);
    const closeMenu = () => setOpen(false);
    const openMenu = () => setOpen(true);

    const { user } = useContext(AuthContext);
    return (
        <nav>
            <div className="nav-container">
                <div className="logo-container">
                    <NavLink to="/" className="logo">
                        <i className="fas fa-poll"></i> POLL
                    </NavLink>
                </div>
                <div className="nav-right">
                    <div className="menu-btn">
                        {open ? (
                            <i className="fas fa-times" onClick={closeMenu}></i>
                        ) : (
                            <i className="fas fa-bars" onClick={openMenu}></i>
                        )}
                    </div>
                    <div className={open ? "nav-links" : "nav-links close"}>
                        {user ? (
                            <div className="nav-item">
                                <NavLink
                                    to="/dashboard"
                                    className="nav-link"
                                    onClick={closeMenu}
                                >
                                    Dashboard
                                </NavLink>
                            </div>
                        ) : null}

                        {user ? (
                            <div className="nav-item">
                                <NavLink
                                    to="/create-poll"
                                    className="nav-link"
                                    onClick={closeMenu}
                                >
                                    New Poll
                                </NavLink>
                            </div>
                        ) : null}

                        <div className="nav-item">
                            <NavLink
                                to="/about"
                                className="nav-link"
                                onClick={closeMenu}
                            >
                                About
                            </NavLink>
                        </div>
                        {user ? null : (
                            <div className="nav-item">
                                <NavLink
                                    to="/login"
                                    className="nav-link"
                                    onClick={closeMenu}
                                >
                                    Login
                                </NavLink>
                            </div>
                        )}

                        {user ? null : (
                            <div className="nav-item">
                                <NavLink
                                    to="/signup"
                                    className="nav-link"
                                    onClick={closeMenu}
                                >
                                    SignUp
                                </NavLink>
                            </div>
                        )}

                        {user ? (
                            <div className="nav-item" onClick={closeMenu}>
                                <Logout />
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
