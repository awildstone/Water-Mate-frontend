import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../App';
import jwt from 'jsonwebtoken';

/** useCurrentUser hook for getting the current user data. */
const useCurrentUser = () => {
    const [ currentUser, setCurrentUser ] = useState(null);

    const handleGetUserData = async (token) => {
        const payload = jwt.decode(token);
        const userId = payload['wm_user_id'];
        const headers = { 'content-type': 'application/json', 'x-access-token': token };
        const url = `${BASE_URL}/user/${userId}/`;
        const method = 'get';

        try {
            const userData = await axios({ url, method, headers});
            setCurrentUser(userData.data.user)
            return { id: userData.data.user.id }
        } catch (err) {
            setCurrentUser(null)
        }
    }

    return [currentUser, setCurrentUser, handleGetUserData];
}

export default useCurrentUser;