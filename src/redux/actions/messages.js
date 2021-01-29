export const DISPLAY_BOT_MESSAGE = 'display_bot_message';
export const DISPLAY_BOT_RECOMMENDATION = 'display_bot_recommendation';
export const DISPLAY_BOT_ERROR = 'display_bot_error';
export const INITIALIZE_MESSAGE = 'initialize_message';
export const MY_MESSAGE = 'my_message';
export const SHOW_OPTIONS = 'show_options';
export const CONVERT_OPTIONS = 'convert_options';

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

export const sendMessage = (message,ads=[],tips=[]) => {
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
                if(data.vendor){
                    const choice = ['none','ad','tip','none','ad','none','none','ad','none','none','tip'];
                    var n = Math.floor(Math.random() * 11);
                    if(choice[n] !== 'none' && (ads.length > 0 || tips.length > 0)){
                        if(choice[n] === 'ad' && data.ads.length === 0){
                            return
                        }
                        if(choice[n] === 'tip' && data.tips.length === 0){
                            return
                        }
                        dispatch(initialiseMessage());
                        const recommendation = choice[n] === 'ad' ? ads[0] : tips[0];
                        const update_ads = choice[n] === 'ad' ? ads.slice(1) : ads;
                        const update_tips = choice[n] === 'ad' ? tips :  tips.slice(1);
                        const payload = {
                            recommendation,
                            ads:update_ads,
                            tips :update_tips
                        };
                        dispatch(displayBotRecommendation(payload));
                    }
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
                })
                .catch(e => {
                    console.log(e.message);
                });
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
        var data = email ? JSON.stringify({email}) : JSON.stringify({email : ''});
        
        fetch(`https://jhene-node.herokuapp.com/api/recommend/getAd`,{
            method : "POST",
            body:data,
            headers : {
                'content-type' : 'application/json'
            }
        }).then(data => data.json())
        .then(data => {
            if(data.success){
                const name = email ? data.name.split(' ')[0] : 'there';
                const message = `Hi ${name}, how can I help you today?`;
                const context = '';
                const vendor = false;
                const payload = {
                    message,
                    context,
                    vendor
                };
                dispatch(displayBotMessage(payload));
                if(data.ads.length > 0 || data.tips.length > 0){
                    //pick a random choice out of four
                    const choice = ['tip','ad','tip','none','ad','none','ad','tip'];
                    var n = Math.floor(Math.random() * 8);
                    if(choice[n] !== 'none'){
                        if(choice[n] === 'ad' && data.ads.length === 0){
                            return
                        }
                        if(choice[n] === 'tip' && data.tips.length === 0){
                            return
                        }
                        dispatch(initialiseMessage());
                        const recommendation = choice[n] === 'ad' ? data.ads[0] : data.tips[0];
                        const ads = choice[n] === 'ad' ? data.ads.slice(1) : data.ads;
                        const tips = choice[n] === 'ad' ? data.tips :  data.tips.slice(1);
                        const payload = {
                            recommendation,
                            ads,
                            tips
                        };
                        dispatch(displayBotRecommendation(payload));
                    }
                }
            }else{
                const data = {message : 'Hola, how can I help you?'}
                dispatch(displayBotMessage(data));
            }
        }).catch(e => {
            const data = {message : 'Hi there, How can I be of help'}
            dispatch(displayBotMessage(data));
        });
    }
};