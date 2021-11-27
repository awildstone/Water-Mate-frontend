import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../App';

/** Method to build a URL for requests. */
const buildUrl = (path) => `${BASE_URL}${path}`;

/** Request object for new user signup & authentication. */
export const signupUser = (data) => ({
    url: buildUrl('/signup/'),
    data,
});

/** Request object for user authentication. */
export const loginUser = (data) => ({
    url: buildUrl('/login/'),
    data,
});

/** useAuth hook for making API calls for authenticating a user. */
const useAuth = () => {
    const [error, setError] = useState(null);

    const handleAuthRequest = async ({ url, method='post', data }) => {
        const headers = { 'content-type': 'application/json' };
        try {
            const response = await axios({ url, method, data, headers});
            setError(null);
            return { success: true, token: response.data.token };
        } catch (err) {
            const message = err.response.data.msg;
            setError(message);
            return { success: false, message };
        }
    }

    return [error, handleAuthRequest];
}

export default useAuth;
