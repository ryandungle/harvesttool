import React from 'react';
import { Route, Navigate } from 'react-router-dom'

export default function PrivateRoute({ component: RouteComponent, user, ...rest }) {
    return (
        <Route
            {...rest}
            render={routeProps => user ? (<RouteComponent {...routeProps} />) : (<Navigate to={"/login"} />)}
        />
    )
}
