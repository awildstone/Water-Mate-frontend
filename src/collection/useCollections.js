import { useState, useContext } from 'react';
import axios from 'axios';

/**The base url for all API requests */
export const BASE_URL = process.env.APP_BASE_URL || 'http://127.0.0.1:5000';

/** Method to build a URL for requests. */
const buildUrl = (base, path) => `${base}${path}`;

const useCollections = (token) => {
    const [loading, setLoading] = useState(true);
    const [collections, setCollections] = useState(null);
    const [error, setError] = useState(null);
    
    const url = buildUrl(BASE_URL, '/collection/');
    const method = 'get';
    const headers = { headers: { 'content-type': 'application/json', 'x-access-token': token } };

    async function fetchData() {
        try {
            const response = await axios({ url, method, headers});
            console.log('useCollections API response:')
            console.log(response);
            setCollections(response);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    }
    
    fetchData();

    return [ collections, error ];
}

export default useCollections;