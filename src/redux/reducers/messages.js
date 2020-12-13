import { INITIALIZE_MESSAGE,DISPLAY_BOT_MESSAGE,MY_MESSAGE } from '../actions/messages';

const initialState = {
    messages : []
}

const messagesReducer = (state = initialState, {type,payload} ) => {
    switch(type){
        case INITIALIZE_MESSAGE:
            return {
                ...state,
                messages : [...state.messages,payload]
            }
        case DISPLAY_BOT_MESSAGE : 
            var init_message = state.messages.pop();
            const loading = false;
            const {
                message,
                context
            } = payload
            const new_payload = Object.assign(init_message,{loading,context,message});
            return {
                ...state,
                messages : [...state.messages,new_payload]
            }
        case MY_MESSAGE :
            return {
                ...state,
                messages : [...state.messages,payload]
            }
        default :
            return state
    }
};

export default messagesReducer;