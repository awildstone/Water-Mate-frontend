import { useState, useCallback } from 'react';
import axios from 'axios';
import { BASE_URL } from '../App';

/** Token key for localStorage. */
const TOKEN_ID = 'watermate-user';

/** Current user auth token. */
const TOKEN = window.localStorage.getItem(TOKEN_ID) || null;

/** Method to build a URL for requests. */
const buildUrl = (path) => `${BASE_URL}${path}`;

/** JSON data header type. */
const JSON = { 'content-type': 'application/json', 'x-access-token': TOKEN };

/** Multipart Form data header type */
const FILE = { 'content-type': 'multipart/form-data', 'x-access-token': TOKEN };

/** Request object for getting plant data. */
export const getPlant = (plant_id) => ({
    url: buildUrl(`/plant/${plant_id}/`),
    method: 'get',
    headers: JSON,
});

/** Request object for getting paginated plant data with a query. */
export const getPlants = (page, params) => ({
    url: buildUrl(`/plant/page/${page}/`),
    method: 'get',
    headers: JSON,
    params: params,
});

/** Request object for getting all Plants to Water data paginated with query filter. */
export const getPlantsToWater = (token, page, params) => ({
    url: buildUrl(`/plant/water-schedule/${page}/`),
    method: 'get',
    params: params,
    headers: { 'content-type': 'application/json', 'x-access-token': token },
});

/** Request object for adding a new Plant. */
export const addPlant = (data) => ({
    url: buildUrl('/plant/'),
    method: 'post',
    data: data,
    headers: FILE,
});

/** Request object for editing a Plant. */
export const editPlant = (id, data) => ({
    url: buildUrl(`/plant/${id}/`),
    method: 'patch',
    data: data,
    headers: FILE,
});

/** Request object for deleting a Plant. */
export const deletePlant = (id) => ({
    url: buildUrl(`/plant/${id}/`),
    method: 'delete',
    headers: JSON,
});

const usePlants = () => {
    const [error, setError] = useState(null);
    const [plants, setPlants] = useState(null);

    const handlePlantRequest = useCallback(async ({ url, method, data={}, headers, params={} }) => {
        try {
            const response = await axios({ url, method, data, headers, params });
            if (method !== 'delete') {
                setError(null);
                setPlants(response.data);
            }
            const message = response.data.msg;
            return { success: true, message, data: response.data };
        } catch (err) {
            const message = err.response.data.msg;
            setError(message);
            return { success: false, message };
        }
    }, []);

    return [ error, plants, setPlants, handlePlantRequest ];
}

export default usePlants;
