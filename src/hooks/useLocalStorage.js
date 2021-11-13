import { useState, useEffect } from 'react';

/** 
 * Custom Hook useLocalStorage
 * 
 * Checks localStorage for existing token in localSorage and sets in app state.
 * 
 * Stores token in localStorage if initial token value is provided, or
 * removes the token from localStorage if a null initial value is provided.
 * 
 * Params: key, value
 * 
 * @returns [token, setToken] state
 * 
*/

const useLocalStorage = (key, value=null) => {
    const initialValue = localStorage.getItem(key) || value;
    const [token, setToken] = useState(initialValue);

    useEffect(() => {
        if (token === null) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, token);
        }
    }, [key, token]);

    return [token, setToken]
};

export default useLocalStorage;