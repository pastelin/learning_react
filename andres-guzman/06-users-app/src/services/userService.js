import usersApi from '../apis/usersApi';

const BASE_URL = '';

export const findAll = async () => {
    return await usersApi.get(BASE_URL);
};

export const save = async ({ username, email, password, admin }) => {
    return await usersApi.post(BASE_URL, { username, email, password, admin });
};

export const update = async ({ id, username, email, admin }) => {
    return await usersApi.put(`${BASE_URL}/${id}`, {
        username,
        email,
        admin,
    });
};

export const remove = async (id) => {
    return await usersApi.delete(`${BASE_URL}/${id}`);
};
