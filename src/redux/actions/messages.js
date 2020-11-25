export const DISPLAY_BOT_MESSAGE = 'display_bot_message';
export const INITIALIZE_MESSAGE = 'initialize_message';
export const MY_MESSAGE = 'my_message';


export const displayBotMessage = payload => {
    return {
        type : DISPLAY_BOT_MESSAGE,
        payload
    }
};

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
            message : '',
            bot_questions : {}
        }
    }
}

export const sendMessage = message => {
    return (dispatch) => {
        dispatch(myMessage(message));
        dispatch(initialiseMessage());
        fetch('localhost:5555/send_message',{
            method : 'POST'
        }).then(data => {
            dispatch(displayBotMessage(data));
        }).catch(e => {

        });
    }
};