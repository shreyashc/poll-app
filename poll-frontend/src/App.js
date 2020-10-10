import React from "react";
import "./App.css";
import Logout from "./components/Logout/Logout";
import AuthContextProvider from "./contexts/AuthContext";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/LogIn/Login";
import SignUp from "./pages/SignUp/SignUp";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import Vote from "./pages/Vote/Vote";
import PollDetails from "./pages/PollDetails/PollDetails";
import CreatePoll from "./pages/CreatePoll/CreatePoll";
import Success from "./pages/Success/Success";
import NavBar2 from "./components/NavBar/NavBar2";
import About from "./pages/About/About";
import Landing from "./pages/Landing/Landing";

function App() {
    return (
        <Router>
            <div className="App">
                <AuthContextProvider>
                    <NavBar2 />
                    <Switch>
                        <PublicRoute exact path="/" component={Landing} />

                        <PrivateRoute
                            exact
                            path="/dashboard"
                            component={Dashboard}
                        />
                        <PrivateRoute
                            exact
                            path="/create-poll"
                            component={CreatePoll}
                        />
                        <PrivateRoute
                            exact
                            path="/poll/:id"
                            component={PollDetails}
                        />

                        <PublicRoute path="/login" component={Login} />

                        <Route path="/about" component={About} />

                        <PublicRoute path="/signup" component={SignUp} />
                        <Route path="/Logout" component={Logout} />
                        <Route path="/vote/:id" component={Vote} />
                        <Route path="/success" component={Success} />
                    </Switch>
                </AuthContextProvider>
            </div>
        </Router>
    );
}

export default App;
