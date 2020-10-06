import React from "react";
import { NavLink, Link } from "react-router-dom";
const NavBar = () => {
   return (
      <nav>
         <div>
            <Link to="/">Poll</Link>
            <ul>
               <li>
                  <NavLink exact to="/">
                     Home
                  </NavLink>
               </li>
               <li>
                  <NavLink to="/login">Login</NavLink>
               </li>
               <li>
                  <NavLink to="/signup">SignUp</NavLink>
               </li>
               <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
               </li>
               <li>
                  <NavLink to="/create-poll">New Poll</NavLink>
               </li>
               <li>
                  <NavLink to="/vote">Vote</NavLink>
               </li>
               <li>
                  <NavLink to="/logout">Logout</NavLink>
               </li>
            </ul>
         </div>
      </nav>
   );
};

export default NavBar;
