import { useState, useCallback } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils';

/** usePlantTypes hook for getting the user plant count. */
const usePlantTypes = () => {
    const [ plantTypes, setPlantTypes ] = useState(null);

    const handleGetPlantTypes = useCallback(async (token) => {
        const headers = { 'content-type': 'application/json', 'x-access-token': token };
        const url = `${BASE_URL}/plant/types/`;
        const method = 'get';

        try {
            const plantTypesData = await axios({ url, method, headers});
            setPlantTypes(plantTypesData.data.plant_types);
        } catch (err) {
            setPlantTypes(null)
        }
    }, []);

    return [plantTypes, handleGetPlantTypes];
}

export default usePlantTypes;
