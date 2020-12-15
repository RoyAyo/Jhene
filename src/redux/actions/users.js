export const INITIALIZE_USER = 'inialize_user';

export const initializeUser = payload => {
    return {
        type : INITIALIZE_USER,
        payload
    }
};