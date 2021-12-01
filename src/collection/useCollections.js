import { useState, useCallback } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils';

/** Method to build a URL for requests. */
const buildUrl = (path) => `${BASE_URL}${path}`;

/** Request object for getting all Collection data. */
export const getCollections = (token) => ({
    url: buildUrl('/collection/'),
    method: 'get',
    token,
});

/** Request object for adding a new Collection. */
export const addCollection = (token, data) => ({
    url: buildUrl('/collection/'),
    method: 'post',
    data,
    token,
});

/** Request object for editing a Collection. */
export const editCollection = (token, id, data) => ({
    url: buildUrl(`/collection/${id}/`),
    method: 'patch',
    data,
    token,
});

/** Request object for deleting a Collection. */
export const deleteCollection = (token, id) => ({
    url: buildUrl(`/collection/${id}/`),
    method: 'delete',
    token,
});

/** useCollections hook for making API calls for different types of Collection requests. */
const useCollections = () => {
    const [error, setError] = useState(null);
    const [collections, setCollections] = useState(null);

    const handleCollectionRequest = useCallback(async ({ url, method, data={}, token }) => {
        const headers = { 'content-type': 'application/json', 'x-access-token': token };

        try {
            const response = await axios({ url, method, data, headers});
            if (method !== 'delete') {
                setError(null);
                setCollections(response.data);
            }
            const message = response.data.msg;
            return { success: true, message };
        } catch (err) {
            const message = err.response.data.msg;
            setError(message);
            return { success: false, message };
        }
    }, []);

    return [ error, collections, handleCollectionRequest ];
}

export default useCollections;
