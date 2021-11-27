import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils';

/** Method to build a URL for requests. */
const buildUrl = (path) => `${BASE_URL}${path}`;

/** Request object for adding a new LightSource. */
export const addLightSource = (token, data) => ({
    url: buildUrl('/light/'),
    method: 'post',
    data,
    token,
});

/** Request object for deleting a LightSource. */
export const deleteLightSource = (token, id) => ({
    url: buildUrl(`/light/${id}/`),
    method: 'delete',
    token,
});

/** useLightSource hook for making API calls for different types of LightSource requests. */
const useLightSource = () => {
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const handleLightSourceRequest = async ({ url, method, data={}, token }) => {
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

    return [ error, message, setMessage, handleLightSourceRequest ];
}

export default useLightSource;
