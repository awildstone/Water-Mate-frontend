/** 
 * Requests is a constants file to format different types of requests.
 *  Each request type is an object that is built with the required request objects: method, url, data, headers.
 */

/**The base url for all API requests */
export const BASE_URL = process.env.APP_BASE_URL || 'http://127.0.0.1:5000';

/** Method to build a URL for requests. */
const buildUrl = (base, path) => `${base}${path}`;

/** Request object for creating a new user account. */
export const createAccount = (token, data) => ({
    url: buildUrl(BASE_URL, '/auth/signup/'),
    method: 'post',
    data: data,
});

/** Request object for authenticating an existing user account. */
export const authenticateAccount = (token, data) => ({
    url: buildUrl(BASE_URL, '/auth/login/'),
    method: 'post',
    data: data,
});

/** Request object to get current user data */
export const getUser = (token, user_id) => ({
    url: buildUrl(BASE_URL, `/user/${user_id}/`),
    method: 'get',
    headers: { 'content-type': 'application/json', 'x-access-token': token },
});

/** Request object for editing User profile data. */
export const editProfile = (token, id, data) => ({
    url: buildUrl(BASE_URL, `/user/${id}/`),
    method: 'patch',
    headers: { 'content-type': 'application/json', 'x-access-token': token },
    data: data,
});

/** Request object for editing User location data. */
export const editLocation = (token, id, data) => ({
    url: buildUrl(BASE_URL, `/user/location/${id}/`),
    method: 'patch',
    headers: { 'content-type': 'application/json', 'x-access-token': token },
    data: data,
});

/** Request object for editing User password. */
export const editPassword = (token, id, data) => ({
    url: buildUrl(BASE_URL, `/user/password/${id}/`),
    method: 'patch',
    headers: { 'content-type': 'application/json', 'x-access-token': token },
    data: data,
});

/** Request object for deleting a User account. */
export const deleteAccount = (token, id) => ({
    url: buildUrl(BASE_URL, `/user/${id}/`),
    method: 'delete',
    headers: { 'content-type': 'application/json', 'x-access-token': token },
});

/** Request object for getting all Collection data. */
export const getCollections = (token) => ({
    url: buildUrl(BASE_URL, '/collection/'),
    method: 'get',
    headers: { 'content-type': 'application/json', 'x-access-token': token },
});

/** Request object for getting all Collections data paginated. */
// export const getPaginatedCollections = (token, page) => ({
//     url: buildUrl(BASE_URL, `/collection/${page}/`),
//     method: 'get',
//     headers: { 'content-type': 'application/json', 'x-access-token': token },
// });

/** Request object for adding a new Collection. */
export const addCollection = (token, data) => ({
    url: buildUrl(BASE_URL, '/collection/'),
    method: 'post',
    headers: { 'content-type': 'application/json', 'x-access-token': token },
    data: data,
});

/** Request object for editing a Collection. */
export const editCollection = (token, id, data) => ({
    url: buildUrl(BASE_URL, `/collection/${id}/`),
    method: 'patch',
    headers: { 'content-type': 'application/json', 'x-access-token': token },
    data: data,
});

/** Request object for deleting a Collection. */
export const deleteCollection = (token, id) => ({
    url: buildUrl(BASE_URL, `/collection/${id}/`),
    method: 'delete',
    headers: { 'content-type': 'application/json', 'x-access-token': token },
});

/** Request object for getting room data with a query. */
export const getRooms = (token, params) => ({
    url: buildUrl(BASE_URL, '/room/'),
    method: 'get',
    headers: { 'content-type': 'application/json', 'x-access-token': token },
    params: params,
});

/** Request object for adding a new Room. */
export const addRoom = (token, data) => ({
    url: buildUrl(BASE_URL, '/room/'),
    method: 'post',
    headers: { 'content-type': 'application/json', 'x-access-token': token },
    data: data,
});

/** Request object for editing a Room. */
export const editRoom = (token, id, data) => ({
    url: buildUrl(BASE_URL, `/room/${id}/`),
    method: 'patch',
    headers: { 'content-type': 'application/json', 'x-access-token': token },
    data: data,
});

/** Request object for deleting a Room. */
export const deleteRoom = (token, id) => ({
    url: buildUrl(BASE_URL, `/room/${id}/`),
    method: 'delete',
    headers: { 'content-type': 'application/json', 'x-access-token': token },
});

/** Request object for adding a new LightSource. */
export const addLightSource = (token, data) => ({
    url: buildUrl(BASE_URL, '/light/'),
    method: 'post',
    headers: { 'content-type': 'application/json', 'x-access-token': token },
    data: data,
});

/** Request object for deleting a LightSource. */
export const deleteLightSource = (token, id) => ({
    url: buildUrl(BASE_URL, `/light/${id}/`),
    method: 'delete',
    headers: { 'content-type': 'application/json', 'x-access-token': token },
});

/** Request object for getting plant data. */
export const getPlant = (token, plant_id) => ({
    url: buildUrl(BASE_URL, `/plant/${plant_id}/`),
    method: 'get',
    headers: { 'content-type': 'application/json', 'x-access-token': token },
});

/** Request object for getting all plant type data. */
export const getPlantTypes = (token) => ({
    url: buildUrl(BASE_URL, '/plant/types/'),
    method: 'get',
    headers: { 'content-type': 'application/json', 'x-access-token': token },
});

/** Request object for getting plant count for current user. */
export const getPlantCount = (token, user_id) => ({
    url: buildUrl(BASE_URL, `/plant/count/${user_id}/`),
    method: 'get',
    headers: { 'content-type': 'application/json', 'x-access-token': token },
});

/** Request object for getting plant data with a query. */
export const getPlants = (token, params) => ({
    url: buildUrl(BASE_URL, `/plant/`),
    method: 'get',
    headers: { 'content-type': 'application/json', 'x-access-token': token },
    params: params,
});

/** Request object for getting all Plants to Water data paginated with or without query. */
export const getPaginatedPlants = (token, page, params) => ({
    url: buildUrl(BASE_URL, `/plant/${page}/`),
    method: 'get',
    headers: { 'content-type': 'application/json', 'x-access-token': token },
    params: params,
});

/** Request object for getting all plant history paginated. */
export const getPaginatedPlantHistory = (token, page, plant_id) => ({
    url: buildUrl(BASE_URL, `/plant/history/${plant_id}/${page}/`),
    method: 'get',
    headers: { 'content-type': 'application/json', 'x-access-token': token },
});

/** Request object for adding a new Plant. */
export const addPlant = (token, data) => ({
    url: buildUrl(BASE_URL, '/plant/'),
    method: 'post',
    headers: { 'content-type': 'multipart/form-data', 'x-access-token': token },
    data: data,
});

/** Request object for editing a Plant. */
export const editPlant = (token, id, data) => ({
    url: buildUrl(BASE_URL, `/plant/${id}/`),
    method: 'patch',
    headers: { 'content-type': 'multipart/form-data', 'x-access-token': token },
    data: data,
});

/** Request object for deleting a Plant. */
export const deletePlant = (token, id) => ({
    url: buildUrl(BASE_URL, `/plant/${id}/`),
    method: 'delete',
    headers: { 'content-type': 'multipart/form-data', 'x-access-token': token },
});

/** Request object for watering a Plant. */
export const waterPlant = (token, schedule_id, action) => ({
    url: buildUrl(BASE_URL, `/schedule${schedule_id}/water/`),
    method: 'post',
    headers: { 'content-type': 'multipart/form-data', 'x-access-token': token },
});

/** Request object for snoozing a Plant. */
export const snoozePlant = (token, schedule_id, data) => ({
    url: buildUrl(BASE_URL, `/schedule${schedule_id}/snooze/`),
    method: 'post',
    headers: { 'content-type': 'multipart/form-data', 'x-access-token': token },
    data: data,
});