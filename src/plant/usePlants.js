import { useState, useCallback } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils';

/** Method to build a URL for requests. */
const buildUrl = (path) => `${BASE_URL}${path}`;

/** Request object for getting plant data. */
export const getPlant = (token, plant_id) => ({
    url: buildUrl(`/plant/${plant_id}/`),
    method: 'get',
    headers: { 'content-type': 'application/json', 'x-access-token': token },
});

/** Request object for getting paginated plant data with a query. */
export const getPlants = (token, page, params) => ({
    url: buildUrl(`/plant/page/${page}/`),
    method: 'get',
    headers: { 'content-type': 'application/json', 'x-access-token': token },
    params,
});

/** Request object for getting all Plants to Water data paginated with query filter. */
export const getPlantsToWater = (token, page, params) => ({
    url: buildUrl(`/plant/water-schedule/${page}/`),
    method: 'get',
    params,
    headers: { 'content-type': 'application/json', 'x-access-token': token },
});

/** Request object for adding a new Plant. */
export const addPlant = (token, data) => ({
    url: buildUrl('/plant/'),
    method: 'post',
    data,
    headers: { 'content-type': 'multipart/form-data', 'x-access-token': token },
});

/** Request object for editing a Plant. */
export const editPlant = (token, id, data) => ({
    url: buildUrl(`/plant/${id}/`),
    method: 'patch',
    data,
    headers: { 'content-type': 'multipart/form-data', 'x-access-token': token },
});

/** Request object for editing a Plant's room & lightsource (Moving a plant). */
export const editPlantRoom = (token, plant_id, data) => ({
    url: buildUrl(`/plant/${plant_id}/moveroom/`),
    method: 'patch',
    data,
    headers: { 'content-type': 'application/json', 'x-access-token': token },
});

/** Request object for deleting a Plant. */
export const deletePlant = (token, id) => ({
    url: buildUrl(`/plant/${id}/`),
    method: 'delete',
    headers: { 'content-type': 'application/json', 'x-access-token': token },
});

const usePlants = () => {
    const [error, setError] = useState(null);
    const [plants, setPlants] = useState(null);

    const handlePlantRequest = useCallback(async ({ url, method, data = {}, headers, params = {} }) => {
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

    return [error, plants, setPlants, handlePlantRequest];
}

export default usePlants;
