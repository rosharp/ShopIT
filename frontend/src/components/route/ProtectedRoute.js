import React, { Fragment } from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ component: Component, ...rest }) {
  const { isAuthenticated, loading, user } = useSelector(state => state.auth)

  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          render={props => {
            if (isAuthenticated === false) {
              return <Navigate to='/login' replace />
            }
            return <Component {...props} replace />
          }}
        />
      )}
    </Fragment>
  )
}

