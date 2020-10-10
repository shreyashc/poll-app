import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const PublicRoute = ({ component: RouteComponent, ...rest }) => {
    const { user } = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={(props) =>
                user ? (
                    <Redirect to={"/dashboard"} />
                ) : (
                    <RouteComponent {...props} />
                )
            }
        />
    );
};

export default PublicRoute;
