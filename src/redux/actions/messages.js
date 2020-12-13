export const DISPLAY_BOT_MESSAGE = 'display_bot_message';
export const DISPLAY_BOT_ERROR = 'display_bot_error';
export const INITIALIZE_MESSAGE = 'initialize_message';
export const MY_MESSAGE = 'my_message';


export const displayBotMessage = payload => {
    return {
        type : DISPLAY_BOT_MESSAGE,
        payload
    }
};

export const displayBotError = payload => {
    return {
        type : DISPLAY_BOT_ERROR,
        payload
    }
}

export const myMessage = message => {
    return {
        type : MY_MESSAGE,
        payload : {
            bot : false,
            message,
            context : '',
        }
    }
}

const initialiseMessage =() => {
    return {
        type : INITIALIZE_MESSAGE,
        payload : {
            bot : true,
            loading : true,
            context : '',
            message : ''
        }
    }
}

export const sendMessage = message => {
    return (dispatch) => {
        dispatch(myMessage(message));
        dispatch(initialiseMessage());
        const from_context = window.localStorage.getItem('_context') || '';
        // const context_response = [];
        const data = {
            message,
            from_context
        }
        console.log(data);
        fetch('http://localhost:8000/send_message',{
            method : 'POST',
            headers : {
                'Content-type' : 'application/json'
            },
            body:data
        })
        .then(data => {
            console.log(data);
            if(data.ok){
                return data.json()
            }
            throw new Error(data.msg)
        })
        .then(data => {
            console.log(data);
            dispatch(displayBotMessage(data));
        }).catch(e => {
            const data = {
                message : e.message
            }
            dispatch(displayBotMessage(data));
        });
    }
};