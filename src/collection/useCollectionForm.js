import { useState, useCallback, useContext } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext';
import { BASE_URL } from '../App';

/** Method to build a URL for requests. */
const buildUrl = (path) => `${BASE_URL}${path}`;

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

/** useCollectionForm hook makes API calls to manage Add/Edit/Delete Collection requests. */
const useCollectionForm = () => {
    const { token } = useContext(UserContext);
    const [error, setError] = useState(null);
    const [collection, setCollection] = useState(null);
    const [message, setMessage] = useState(null);

    const handleCollectionRequest = useCallback(async ({ url, method, data={} }) => {
        const headers = { 'content-type': 'application/json', 'x-access-token': token };
        try {
            const response = await axios({ url, method, data, headers});
            const message = response.data.msg;
            if (method !== 'delete') {
                setError(null);
                setMessage(message);
                setCollection(response.data.collection);
            } else {
                return { success: true, message }
            }
        } catch (err) {
            const message = err.response.data.msg;
            setCollection(null);
            setMessage(null);
            setError(message);
            if (method === 'delete') return { success: false, message }
        }
    }, [token]);

    return [ error, message, collection, handleCollectionRequest ];
}

export default useCollectionForm;