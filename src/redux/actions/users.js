export const INITIALIZE_USER = 'inialize_user';

export const initializeUser = payload => {
    return {
        type : INITIALIZE_USER,
        payload
    }
};

export const checkNewUser = () => {
    return (dispatch) => {
        //check the token and fetch
        const token = window.localStorage.getItem('_token_');
        const data = JSON.stringify({
            token
        });
        
        fetch(``,{
                method : 'POST',
                headers : {
                    'Content-type' : 'application/json'
                },
                body:data
            })
            .then(data => {
                if(data.ok){
                    return data.json()
                }
                throw new Error(data.msg)
            })
            .then(data => {
                if(data.success){
                    dispatch(initializeUser(data));
                }
                throw new Error(data.msg);
            }).catch(e => {
                console.log(e.message);
            });
    }
}