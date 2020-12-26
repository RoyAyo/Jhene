import { INITIALIZE_MESSAGE,DISPLAY_BOT_MESSAGE,MY_MESSAGE, FOLLOW_UPS, Click_Button, Convert_Options } from '../actions/messages';

const initialState = {
    messages : [{'message':'Hola, how are you doing?',bot:true,context:''}],
    message_loading : false,
    questions : {},
    in_loop : false,
    answers : {},
    requirements : [],
    context : ''
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
            } = payload
            var new_payload = Object.assign(init_message,{loading,context,message,with_option:false,vendor});
            return {
                ...state,
                message_loading : false,
                messages : [...state.messages,new_payload]
            }
        case MY_MESSAGE :
            return {
                ...state,
                messages : [...state.messages,payload]
            }
        case FOLLOW_UPS :
            var r = payload.requirements.pop(0);
            var options = payload.final_questions[r];
            var payload_ = {
                vendor : false,
                with_option: true,
                bot : true,
                options
            }
            return {
                ...state,
                in_loop : true,
                questions : [...state,payload.final_questions],
                messages : [...state.messages,payload_],
                answers : payload.answers,
                requirements : payload.requirements
            }
        case Click_Button:
            var answer = payload.answer;
            var answer_to = payload.answer_to;
            var answers = state.answers;
            answers[answer_to] = answer;
            return {
                ...state,
                answers,
            }
        case Convert_Options: 
            var last_message = state.messages.pop();
            var initMessage = '';
            var i = 0;
            last_message.options.forEach(option => {
                if(i === last_message.length){
                    initMessage += `${option} or`;
                }else{
                    initMessage += `${option}, `;
                }
                i++;
            });
            var newPayload = Object.assign(last_message,{message:initMessage,with_option:false})
            return {
                messages : [...state.messages,newPayload]
            }
        default :
            return state
    }
};

export default messagesReducer;