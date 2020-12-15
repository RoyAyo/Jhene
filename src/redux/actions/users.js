export const INITIALIZE_USER = 'inialize_user';

export const initialize_user = payload => {
    return {
        type : INITIALIZE_USER,
        payload
    }
};