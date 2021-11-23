import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../App';

/** Token key for localStorage. */
const TOKEN_ID = 'watermate-user';

/** Current user auth token. */
const TOKEN = window.localStorage.getItem(TOKEN_ID) || null;

/** Method to build a URL for requests. */
const buildUrl = (path) => `${BASE_URL}${path}`;

/** Request object for adding a new LightSource. */
export const addLightSource = (data) => ({
    url: buildUrl('/light/'),
    method: 'post',
    data: data,
});

/** Request object for deleting a LightSource. */
export const deleteLightSource = (id) => ({
    url: buildUrl(`/light/${id}/`),
    method: 'delete',
});

/** useLightSource hook for making API calls for different types of LightSource requests. */
const useLightSource = () => {
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const handleLightSourceRequest = async ({ url, method, data={} }) => {
        const headers = { 'content-type': 'application/json', 'x-access-token': TOKEN };
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
