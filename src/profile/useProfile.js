import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils';

/** Method to build a URL for requests. */
const buildUrl = (path) => `${BASE_URL}${path}`;

/** Request object for editing User profile data. */
export const editProfile = (token, user_id, data) => ({
    url: buildUrl(`/user/${user_id}/`),
    method: 'patch',
    data,
    token,
});

/** Request object for editing User location data. */
export const editLocation = (token, user_id, data) => ({
    url: buildUrl(`/user/location/${user_id}/`),
    method: 'patch',
    data,
    token,
});

/** Request object for editing User password. */
export const editPassword = (token, user_id, data) => ({
    url: buildUrl(`/user/password/${user_id}/`),
    method: 'patch',
    data,
    token,
});

/** Request object for deleting a User account. */
export const deleteAccount = (token, user_id) => ({
    url: buildUrl(`/user/${user_id}/`),
    method: 'delete',
    token,
});

/** useProfile hook for making API calls for different types of user profile requests. */
const useProfile = () => {
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const handleProfileRequest = async ({ url, method, data={}, token }) => {
        const headers = { 'content-type': 'application/json', 'x-access-token': token };
        try {
            const response = await axios({ url, method, data, headers});
            const message = response.data.msg;
            setError(null);
            setMessage(message);
            return { success: true, message };
        } catch (err) {
            const message = err.response.data.msg;
            setMessage(null);
            setError(message);
            return { success: false, message };
        }
    }

    return [ error, message, setMessage, handleProfileRequest ];
}

export default useProfile;
