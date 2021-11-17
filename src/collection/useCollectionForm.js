import { useState } from 'react';
import axios from 'axios';

const useCollections = () => {
    const [error, setError] = useState(null);

    const handleSubmit = async ({ url, method, data, headers }) => {
        try {
            const response = await axios({ url, method, data, headers});
            // console.log('useCollectionForm API response:', response);
            setError(null);
            return { success: true, data: response.data };
        } catch (err) {
            const message = err.response.data.msg;
            // console.error('API ERROR:', err);
            setError(message);
            return { success: false, message };
        }
    }

    return [ error, handleSubmit ];
}

export default useCollections;