import { useState, useCallback } from 'react';
import axios from 'axios';
import { BASE_URL } from '../App';

/** usePlantCount hook for getting the user plant count. */
const usePlantCount = () => {
    const [ userPlantCount, setUserPlantCount ] = useState(null);

    const handleGetPlantCount = useCallback(async (token, userId) => {
        const headers = { 'content-type': 'application/json', 'x-access-token': token };
        const url = `${BASE_URL}/plant/count/${userId}/`;
        const method = 'get';

        try {
            const response = await axios({ url, method, headers});
            setUserPlantCount(response.data.user_plant_count);
        } catch (err) {
            setUserPlantCount(null)
        }
    }, []);

    return [userPlantCount, setUserPlantCount, handleGetPlantCount];
}

export default usePlantCount;
