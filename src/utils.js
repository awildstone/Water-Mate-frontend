/** Shared data for Water Mate App */
import jwt from 'jsonwebtoken';

/** Styling for Modals. */
export const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

/** Storage key for auth token. */
export const TOKEN_ID = 'watermate-user';

/** Storage key for refresh token. */
export const REFRESH_TOKEN_ID = 'wm_refresh_token';

/** Base URL for API calls. */
export const BASE_URL = process.env.APP_BASE_URL || 'http://127.0.0.1:5000';

/** Function to decode expiration date from a token & check if the token expiration date is less than the current date. */
export const isValid = (token) => {
    const payload = jwt.decode(token);
    return (new Date() < new Date(payload['exp'] * 1000));
}