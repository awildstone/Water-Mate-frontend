import { useState, useCallback } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils';

/** Method to build a URL for requests. */
const buildUrl = (path) => `${BASE_URL}${path}`;

/** Request object for getting paginated plant history data. */
export const getHistory = (token, plant_id, page) => ({
    url: buildUrl(`/plant/history/${plant_id}/${page}/`),
    method: 'get',
    headers: { 'content-type': 'application/json', 'x-access-token': token },
});

const useHistory = () => {
    const [error, setError] = useState(null);
    const [history, setHistory] = useState(null);

    const handleHistoryRequest = useCallback(async ({ url, method, data={}, headers, params={} }) => {
        try {
            const response = await axios({ url, method, data, headers, params });
            setError(null);
            setHistory(response.data);
            const message = response.data.msg;
            return { success: true, message, data: response.data };
        } catch (err) {
            const message = err.response.data.msg;
            setError(message);
            return { success: false, message };
        }
    }, []);

    return [ error, history, setHistory, handleHistoryRequest ];
}

export default useHistory;
