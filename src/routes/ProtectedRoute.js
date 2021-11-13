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
    
    if (window.localStorage.getItem('watermate-user')) {
        return (
            <Route {...otherProps}>
                { children }
            </Route>
        )
    }

    return <Redirect to='/login' />
};

export default ProtectedRoute;