import { useState, useContext } from 'react';
import axios from 'axios';
import { BASE_URL } from '../App';
import UserContext from '../context/UserContext';

/** Method to build a URL for requests. */
const buildUrl = (path) => `${BASE_URL}${path}`;

/** Request object for editing a plant's water Schedule details. */
export const editSchedule = (token, id, data) => ({
    url: buildUrl(`/schedule/${id}/`),
    method: 'patch',
    data,
    token,
});

/** Request object for watering a plant and updating the plant's schedule. */
export const waterPlant = (token, schedule_id, data) => ({
    url: buildUrl(`/schedule/${schedule_id}/water/`),
    method: 'post',
    data,
    token,
});

/** Request object for snoozing a plant and updating the plant's schedule. */
export const snoozePlant = (token, schedule_id, data) => ({
    url: buildUrl(`/schedule/${schedule_id}/snooze/`),
    method: 'post',
    data,
    token,
});

/** useSchedule hook for making API calls for different types of Schedule requests. */
const useSchedule = () => {
    const { token } = useContext(UserContext);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const handleScheduleRequest = async ({ url, method, data={}, token }) => {
        const headers = { 'content-type': 'application/json', 'x-access-token': token };
        try {
            const response = await axios({ url, method, data, headers});
            const message = response.data.msg;
            setError(null);
            setMessage(message);
            return { success: true, message };
        } catch (err) {
            const message = err.response.data.msg;
            setMessage(null);
            setError(message);
            return { success: false, message };
        }
    }

    return [ error, message, setMessage, handleScheduleRequest ];
}

export default useSchedule;
