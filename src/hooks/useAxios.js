import { useState } from 'react';
import axios from 'axios';

const useAxios = ({ method, url, data={}, headers}) => {
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const params = (method === 'get') ? data : {};

    async function fetchData () {
        try {
            const response = await axios({ url, method, data, params, headers});
            setResults(response.data);
        } catch (e) {
            setError(e);
        }
    }
    
    fetchData();

    return { results, error };
}

// const BASE_URL = process.env.APP_BASE_URL || 'http://127.0.0.1:5000';

// const useAxios = ({ token, endpoint, data = {}, method = "get" }) => {
//     const [response, setResponse] = useState(null);
//     const [error, setError] = useState('');
//     const [loading, setloading] = useState(true);

//     async function fetchData () {
//         const url = `${BASE_URL}/${endpoint}/`;
//         const params = (method === "get") ? data : {};
//         const headers = {
//             'content-type': 'application/json',
//             'x-access-token': token
//         };

//         let data;
//         try {
//             data = await axios({ url, method, data, params, headers});
//             setResponse(res.data);
//         } catch (e) {
//             setError(e);
//         }
//         setloading(false);
//     }
    
//     fetchData();

//     return { response, error, loading };
// }

export default useAxios;