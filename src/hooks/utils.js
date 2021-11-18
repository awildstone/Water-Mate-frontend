/** Contstants and utility functions shared across hooks. */
import axios from 'axios';

/** Base URL for API requests. */
export const BASE_URL = process.env.APP_BASE_URL || 'http://127.0.0.1:5000';

/** Token key for localStorage. */
export const TOKEN_ID = 'watermate-user';

/** Current user auth token. 
 * If there is no auth token in localstorage then the token will be null.
*/
export const TOKEN = window.localStorage.getItem(TOKEN_ID) || null;

/** Method to build a URL for requests. */
export const buildUrl = (path) => `${BASE_URL}${path}`;

/** handleRequest is a function that accepts a request object param and makes a call to the API.
 * If the request is successful, sets the response data in state.
 * Returns success boolean and message, or success boolean and error message.
  */
export const handleRequest = async ({ url, method, data={}, headers={}, params={} }) => {
    try {
        const response = await axios({ url, method, data, headers, params});
        // console.log('useCollectionForm API response:', response);
        setError(null);
        setCollections(response.data);
        const message = response.data.msg;
        return { success: true, message };
    } catch (err) {
        const message = err.response.data.msg;
        // console.error('API ERROR:', err);
        setError(message);
        return { success: false, message };
    }
}

