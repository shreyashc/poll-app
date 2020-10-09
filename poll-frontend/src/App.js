import React from "react";
import "./App.css";
import Logout from "./components/Logout/Logout";
import NavBar from "./components/NavBar/NavBar";
import AuthContextProvider from "./contexts/AuthContext";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/LogIn/Login";
import SignUp from "./pages/SignUp/SignUp";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Vote from "./pages/Vote/Vote";
import PollDetails from "./pages/PollDetails/PollDetails";
import CreatePoll from "./pages/CreatePoll/CreatePoll";
import Success from "./pages/Success/Success";

function App() {
    return (
        <Router>
            <div className="App">
                <NavBar />
                <AuthContextProvider>
                    <Switch>
                        <PrivateRoute exact path="/" component={Dashboard} />
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
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={SignUp} />
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
