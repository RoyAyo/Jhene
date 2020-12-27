export const DISPLAY_BOT_MESSAGE = 'display_bot_message';
export const DISPLAY_BOT_ERROR = 'display_bot_error';
export const INITIALIZE_MESSAGE = 'initialize_message';
export const MY_MESSAGE = 'my_message';
export const SHOW_OPTIONS = 'show_options';
export const Click_Button = 'click_button';
export const CONVERT_OPTIONS = 'convert_options';


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

const showOption = payload => {
    return {
        type : SHOW_OPTIONS,
        payload
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

const convertOptions = payload => {
    return {
        type : CONVERT_OPTIONS,
        payload
    }
}

export const clickButton = ({option,requirements,answers,questions,context,answering}) => {
    return (dispatch) => {
        answers[answering] = option.split(" ")[0].toLowerCase();
        var new_requirements = requirements.filter(i => i !== answering);
        dispatch(convertOptions({option,new_requirements,answers}));
        dispatch(myMessage(option));
        dispatch(initialiseMessage());
        if(requirements.length <= 1){
            const from_context = context;
            const data = {
                from_context,
                message : "",
                answers,
                more_info : true,
                location : ""
            }
            console.log(data);
            fetch(`http://localhost:8000/send_message`,{
                method : 'POST',
                headers : {
                    'Content-type' : 'application/json'
                },
                body:JSON.stringify(data)
            })
            .then(data => {
                if(data.ok){
                    return data.json()
                }
                throw new Error(data.msg)
            })
            .then(data => {
                dispatch(displayBotMessage(data));
            }).catch(e => {
                const data = {
                    message : e.message
                }
                dispatch(displayBotMessage(data));
            });
        }else{
            dispatch(showOption({questions,requirements:new_requirements,answers,context}));
        }
        
    }
}

export const sendMessage = message => {
    return (dispatch) => {
        dispatch(myMessage(message));
        dispatch(initialiseMessage());
        const from_context = ''
        const data = {
            message,
            from_context,
            answers : {},
            more_info : false,
            location : ""

        }
        fetch(`http://localhost:8000/send_message`,{
            method : 'POST',
            headers : {
                'Content-type' : 'application/json'
            },
            body:JSON.stringify(data)
        })
        .then(data => {
            if(data.ok){
                return data.json()
            }
            throw new Error(data.msg)
        })
        .then(data => {
            if(data.more_info){
                //edit data to taste
                dispatch(showOption(data));
            }else{
                dispatch(displayBotMessage(data));
            }
        }).catch(e => {
            const data = {
                message : e.message
            }
            dispatch(displayBotMessage(data));
        });
    }
};