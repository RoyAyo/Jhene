import { INITIALIZE_MESSAGE,DISPLAY_BOT_MESSAGE,MY_MESSAGE, CONVERT_OPTIONS, SHOW_OPTIONS } from '../actions/messages';

const initialState = {
    messages : [{'message':'Hola, how are you doing?',bot:true,context:''}],
    message_loading : false,
    questions : {},
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
        case SHOW_OPTIONS :
            state.messages.pop();
            var r = payload.requirements[0];
            var options = payload.final_questions[r];
            var payload_ = {
                with_option: true,
                bot : true,
                message : 'Select One',
                options
            }
            return {
                ...state,
                questions : [...state.questions,payload.final_questions],
                messages : [...state.messages,payload_],
                answers : payload.answers,
                requirements : payload.requirements,
                context : payload.context
            }
        case CONVERT_OPTIONS: 
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
            var answers = payload.answers;
            r = payload.requirements.pop(0);
            answers[r] = payload.option;
            var newPayload = Object.assign(last_message,{message:initMessage,with_option:false,vendor:false});
            return {
                ...state,
                messages : [...state.messages,newPayload],
                answers,
                requirements : payload.requirements
            }
        default :
            return state
    }
};

export default messagesReducer;