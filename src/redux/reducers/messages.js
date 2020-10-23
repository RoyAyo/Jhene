import { SEND_MESSAGE } from '../actions/messages';

const initialState = {
    messages : {}
}

const messagesReducer = (state = initialState, {type,payload} ) => {
    switch(type){
        case SEND_MESSAGE:
            return {
                messages : payload.data
            }
        default :
            return state
    }
};

export default messagesReducer;