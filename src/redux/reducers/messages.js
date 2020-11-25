import { INITIALIZE_MESSAGE,DISPLAY_BOT_MESSAGE } from '../actions/messages';

const initialState = {
    messages : []
}

const messagesReducer = (state = initialState, {type,payload} ) => {
    switch(type){
        case INITIALIZE_MESSAGE:
            return {
                ...state,
                messages : state.messages.push(payload)
            }
        case DISPLAY_BOT_MESSAGE : 
            return {
                ...state
            }
        default :
            return state
    }
};

export default messagesReducer;