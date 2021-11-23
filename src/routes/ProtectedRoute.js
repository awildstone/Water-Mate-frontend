import { Redirect, Route } from 'react-router-dom';

/**
 * Renders ProtectedRoute component.
 * 
 * Confirms user token exists in localStorage and conditionally
 * renders a Route or Redirect based on localStorage state.
 * 
 * @param {children, ...otherProps}
 * @returns Route or Redirect
 */

const ProtectedRoute = ({ children, ...otherProps }) => {
    const TOKEN_ID = 'watermate-user';
    if (window.localStorage.getItem(TOKEN_ID)) {
        return (
            <Route {...otherProps}>
                { children }
            </Route>
        )
    }

    return <Redirect to='/login' />
};

export default ProtectedRoute;
