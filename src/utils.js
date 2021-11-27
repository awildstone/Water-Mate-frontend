/** Shared data for Water Mate App */

/** Styling for Modals. */
export const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

/** Storage key for user token. */
export const TOKEN_ID = 'watermate-user';

/** Base URL for API calls. */
export const BASE_URL = process.env.APP_BASE_URL || 'http://127.0.0.1:5000';