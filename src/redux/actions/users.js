export const INITIALIZE_USER = 'inialize_user';


export const initializeUser = payload => {
    return {
        type : INITIALIZE_USER,
        payload
    }
};

export const userWelcome = email => {
    return (dispatch) => {

        const data = JSON.stringify({email});

        fetch(`https://jhene-node.herokuapp.com/api/recommend`,{
            method : "POST",
            data,
            headers : {
                'content-type' : 'application/json'
            }
        }).then(data => data.json())
        .then(data => {
            //initialize them with a greet..
            //follow up with a quick recommendation if any..

        })
        .catch(e => {
            //do your normal message initializer
        });
    }
};