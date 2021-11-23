import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../App';

/** usePlantCount hook for getting the user plant count. */
const usePlantCount = () => {
    const [ userPlantCount, setUserPlantCount ] = useState(null);

    const handleGetPlantCount = async (userId, token) => {
        const headers = { 'content-type': 'application/json', 'x-access-token': token };
        const url = `${BASE_URL}/plant/count/${userId}/`;
        const method = 'get';

        try {
            const response = await axios({ url, method, headers});
            const count = response.data.user_plant_count;
            console.log(count);
            setUserPlantCount(count)
        } catch (err) {
            setUserPlantCount(null)
        }
    }

    return [userPlantCount, setUserPlantCount, handleGetPlantCount];
}

export default usePlantCount;
