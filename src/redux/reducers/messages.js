import { INITIALIZE_MESSAGE,DISPLAY_BOT_MESSAGE,MY_MESSAGE, CONVERT_OPTIONS, SHOW_OPTIONS, DISPLAY_BOT_RECOMMENDATION } from '../actions/messages';

// const test_message = 

const initialState = {
    messages : [{
        bot : true,
        context : '',
        message : 'Hello',
        with_option:false,
        vendor : {
            logo : "https://www.logodesign.net/logo/sea-swoosh-in-shape-of-letter-c-with-sun-4761ld.png",
            link : "https://twitter.com/BotJhene",
            business_name : "Cactus Jhack Apparel",
            phone_number : "08087219810"
        }
    }],
    message_loading : false,
    questions : {},
    answers : {},
    requirements : [],
    context : '',
    recommendations : []
}

const messagesReducer = (state = initialState, {type,payload} ) => {
    switch(type){
        case INITIALIZE_MESSAGE:
            return {
                ...state,
                message_loading : true,
                messages : [...state.messages,payload]
            }
        case DISPLAY_BOT_MESSAGE : 
            var init_message = state.messages.pop();
            var loading = false;
            var {
                message,
                context,
                vendor
            } = payload;
            var new_payload = Object.assign(init_message,{loading,message,with_option:false,vendor});
            return {
                ...state,
                message_loading : false,
                messages : [...state.messages,new_payload],
                context
            }
        case MY_MESSAGE :
            return {
                ...state,
                messages : [...state.messages,payload]
            }
        case DISPLAY_BOT_RECOMMENDATION :
            var init_recommend_message = state.messages.pop();
            var new_recommend_payload = Object.assign(init_recommend_message,{loading:false,message:'',with_option:false,vendor:false,recommendation:payload.recommendation});
            return {
                ...state,
                recommendations : payload.recommendations,
                messages : [...state.messages,new_recommend_payload],
                message_loading : false
            }
        case SHOW_OPTIONS :
            state.messages.pop();
            var r = payload.requirements[0];
            var options = payload.questions[r];
            var payload_ = {
                with_option: true,
                bot : true,
                message : 'Select One',
                options,
                answering : r
            }
            return {
                ...state,
                questions : Object.assign(state.questions,payload.questions),
                messages : [...state.messages,payload_],
                answers : payload.answers,
                requirements : payload.requirements,
                context : payload.context
            }
        case CONVERT_OPTIONS: 
            var last_message = state.messages.pop();
            var initMessage = '';
            var i = 1;
            last_message.options.forEach(option => {
                if(i === (last_message.options.length - 1)){
                    initMessage += `${option} or `;
                }
                else if(i === last_message.options.length){
                    initMessage += `${option}`;
                }
                else{
                    initMessage += `${option}, `;
                }
                i++;
            });
            var newPayload = Object.assign(last_message,{message:initMessage,with_option:false,vendor:false});
            return {
                ...state,
                messages : [...state.messages,newPayload],
                answers : payload.answers,
                requirements : payload.new_requirements
            }
        default :
            return state
    }
};

export default messagesReducer;