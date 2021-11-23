import { useState, useCallback } from 'react';
import axios from 'axios';
import { BASE_URL } from '../App';

/** Token key for localStorage. */
const TOKEN_ID = 'watermate-user';

/** Current user auth token. */
const TOKEN = window.localStorage.getItem(TOKEN_ID) || null;

/** Method to build a URL for requests. */
const buildUrl = (path) => `${BASE_URL}${path}`;

/** Request object for getting room data with a query filter. */
export const getRooms = (params) => ({
    url: buildUrl('/room/'),
    method: 'get',
    params: params,
});

/** Request object for adding a new Room. */
export const addRoom = (data) => ({
    url: buildUrl('/room/'),
    method: 'post',
    data: data,
});

/** Request object for editing a Room. */
export const editRoom = (id, data) => ({
    url: buildUrl(`/room/${id}/`),
    method: 'patch',
    data: data,
});

/** Request object for deleting a Room. */
export const deleteRoom = (id) => ({
    url: buildUrl(`/room/${id}/`),
    method: 'delete',
});

const useRooms = () => {
    const [error, setError] = useState(null);
    const [rooms, setRooms] = useState(null);

    const handleRoomRequest = useCallback(async ({ url, method, data={}, params={} }) => {
        const headers = { 'content-type': 'application/json', 'x-access-token': TOKEN };
        try {
            const response = await axios({ url, method, data, headers, params});
            // console.log('useRooms API response:', response);
            if (method !== 'delete') {
                setError(null);
                setRooms(response.data);
            }
            const message = response.data.msg;
            return { success: true, message };
        } catch (err) {
            const message = err.response.data.msg;
            // console.error('API ERROR:', err);
            setError(message);
            return { success: false, message };
        }
    }, []);

    return [ error, rooms, setRooms, handleRoomRequest ];
}

export default useRooms;
