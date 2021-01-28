export const DISPLAY_BOT_MESSAGE = 'display_bot_message';
export const DISPLAY_BOT_RECOMMENDATION = 'display_bot_recommendation';
export const DISPLAY_BOT_ERROR = 'display_bot_error';
export const INITIALIZE_MESSAGE = 'initialize_message';
export const MY_MESSAGE = 'my_message';
export const SHOW_OPTIONS = 'show_options';
export const Click_Button = 'click_button';
export const CONVERT_OPTIONS = 'convert_options';
export const SET_RECOMMENDATIONS = 'set_recommendations'

export const displayBotMessage = payload => {
    return {
        type : DISPLAY_BOT_MESSAGE,
        payload
    }
};

export const displayBotRecommendation = payload => {
    return {
        type : DISPLAY_BOT_RECOMMENDATION,
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
            fetch(`https://api.jhene.co/send_message`,{
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

export const sendMessage = (message,recommendations=[]) => {
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
        fetch(`https://api.jhene.co/send_message`,{
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
            if(data.status === 500 || data.status === 404){
                throw new Error("server");
            }
            throw new Error(data.msg);
        })
        .then(data => {
            if(data.more_info){
                //edit data to taste
                dispatch(showOption(data));
            }else{
                dispatch(displayBotMessage(data));
                if(recommendations.length > 0){
                    if(data.vendor){
                        dispatch(initialiseMessage());
                        const recommendation = data.recommendations[0];
                        const recommendations = data.recommendations.slice(1);
                        const payload = {
                            recommendation,
                            recommendations
                        };
                        dispatch(displayBotRecommendation(payload));
                    }
                    //dey run for background, add to user
                    const email = window.localStorage.getItem('email');
                    const to_send = JSON.stringify({
                        email,
                        vendor:data.vendor,
                        context:data.context
                        
                    });
                    fetch(`https://jhene-node.herokuapp.com/api/recommend/addProduct`,{
                        method : "POST",
                        body:to_send,
                        headers : {
                            'content-type' : 'application/json'
                        }
                    }).then(data => data.json())
                    .catch(e => {
                        console.log(e.message);
                    });
                }
            }
        }).catch(e => {
            var data;
            if(e.message === 'server'){
                data = {
                    message : "I am currently down, please try again later"
                }
            }
            else{
                data = {
                    message : "You cannot currently reach me, seem to be a network issue"
                }
            }
            dispatch(displayBotMessage(data));
        });
    }
};

export const userWelcome = (email) => {
    return (dispatch) => {
        dispatch(initialiseMessage());
        if(email) {
        const data = JSON.stringify({email});

        fetch(`https://jhene-node.herokuapp.com/api/recommend/getAd`,{
            method : "POST",
            body:data,
            headers : {
                'content-type' : 'application/json'
            }
        }).then(data => data.json())
        .then(data => {
            if(data.success){
                const name = data.user.name.split(' ')[0];
                const message = `Hi ${name}, how can I help you today?`;
                const context = '';
                const vendor = false;
                const payload = {
                    message,
                    context,
                    vendor
                };
            dispatch(displayBotMessage(payload));
            if(data.recommendations.length > 0){
                dispatch(initialiseMessage());
                const recommendation = data.recommendations[0];
                const recommendations = data.recommendations.slice(1);
                const payload = {
                    recommendation,
                    recommendations
                };
                dispatch(displayBotRecommendation(payload));
            }
        }else{
            const data = {
                message : 'Hola, how can I help you??'
            }
            dispatch(displayBotMessage(data));
            }
        })
        .catch(e => {
            const data = {
                message : 'Hi there, How can I be of help'
            }
            dispatch(displayBotMessage(data));
        });    
        }else{
            dispatch(displayBotMessage({message:'Hi there, How may I help you today'}));
        }
    }
};