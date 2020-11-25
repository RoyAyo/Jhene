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
            more_context : false,
            context : '',
            message : '',
            bot_questions : {}
        }
    }
}

export const sendMessage = message => {
    return (dispatch) => {
        dispatch(myMessage(message));
        dispatch(initialiseMessage());
        const from_context = window.localStorage.setItem('_context') || '';
        const data = {
            from_context,
            message
        }
        fetch('localhost:5555/send_message',{
            method : 'POST',
            headers : {
                'Content-type' : 'application/json'
            },
            data
        })
        .then(data => {
            if(data.ok){
                return data.json()
            }
            throw new Error(data.msg)
        })
        .then(data => {
            if(data.more_context){
                window.localStorage.setItem('_context',data.context);
            }else{
                window.localStorage.removeItem('_context');
            }
            dispatch(displayBotMessage(data));
        }).catch(e => {
            dispatch(displayBotError(e.message));
        });
    }
};