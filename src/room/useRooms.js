import { useState, useCallback } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils';

/** Method to build a URL for requests. */
const buildUrl = (path) => `${BASE_URL}${path}`;

/** Request object for getting room data with a query filter. */
export const getRooms = (token, params) => ({
    url: buildUrl('/room/'),
    method: 'get',
    params,
    token,
});

/** Request object for adding a new Room. */
export const addRoom = (token, data) => ({
    url: buildUrl('/room/'),
    method: 'post',
    data,
    token,
});

/** Request object for editing a Room. */
export const editRoom = (token, id, data) => ({
    url: buildUrl(`/room/${id}/`),
    method: 'patch',
    data,
    token,
});

/** Request object for deleting a Room. */
export const deleteRoom = (token, id) => ({
    url: buildUrl(`/room/${id}/`),
    method: 'delete',
    token,
});

const useRooms = () => {
    const [error, setError] = useState(null);
    const [rooms, setRooms] = useState(null);

    const handleRoomRequest = useCallback(async ({ url, method, data={}, params={}, token }) => {
        const headers =  { 'content-type': 'application/json', 'x-access-token': token };
        try {
            const response = await axios({ url, method, data, headers, params});
            if (method !== 'delete') {
                setError(null);
                setRooms(response.data);
            }
            const message = response.data.msg;
            return { success: true, message };
        } catch (err) {
            const message = err.response.data.msg;
            setError(message);
            return { success: false, message };
        }
    }, []);

    return [ error, rooms, setRooms, handleRoomRequest ];
}

export default useRooms;
