import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../App';

/** Token key for localStorage. */
const TOKEN_ID = 'watermate-user';

/** Current user auth token. */
const TOKEN = window.localStorage.getItem(TOKEN_ID) || null;

/** Method to build a URL for requests. */
const buildUrl = (path) => `${BASE_URL}${path}`;

/** Request object for getting all Collection data. */
export const getCollections = () => ({
    url: buildUrl('/collection/'),
    method: 'get',
});

/** Request object for adding a new Collection. */
export const addCollection = (data) => ({
    url: buildUrl('/collection/'),
    method: 'post',
    data: data,
});

/** Request object for editing a Collection. */
export const editCollection = (id, data) => ({
    url: buildUrl(`/collection/${id}/`),
    method: 'patch',
    data: data,
});

/** Request object for deleting a Collection. */
export const deleteCollection = (id) => ({
    url: buildUrl(`/collection/${id}/`),
    method: 'delete',
});

const useCollections = () => {
    const [error, setError] = useState(null);
    const [collections, setCollections] = useState(null);

    const handleCollectionRequest = async ({ url, method, data={} }) => {
        const headers = { 'content-type': 'application/json', 'x-access-token': TOKEN };
        try {
            const response = await axios({ url, method, data, headers});
            // console.log('useCollections API response:', response);
            if (method !== 'delete') {
                setError(null);
                setCollections(response.data);
            }
            const message = response.data.msg;
            return { success: true, message };
        } catch (err) {
            const message = err.response.data.msg;
            // console.error('API ERROR:', err);
            setError(message);
            return { success: false, message };
        }
    }

    return [ error, collections, setCollections, handleCollectionRequest ];
}

export default useCollections;