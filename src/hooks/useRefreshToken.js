import { useState, useEffect } from 'react';

/** 
 * Custom Hook useRefreshToken
 * 
 * Checks localStorage for existing refresh token in localSorage and sets in app state.
 * 
 * Stores refresh token in localStorage if initial refresh token value is provided, or
 * removes the  refresh token from localStorage if a null initial value is provided.
 * 
 * Params: key, value
 * 
 * @returns [refreshToken, setRefreshToken] state
 * 
*/

const useRefreshToken = (key, value=null) => {
    const initialValue = localStorage.getItem(key) || value;
    const [refreshToken, setRefreshToken] = useState(initialValue);

    useEffect(() => {
        if (refreshToken === null) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, refreshToken);
        }
    }, [key, refreshToken]);

    return [refreshToken, setRefreshToken]
};

export default useRefreshToken;