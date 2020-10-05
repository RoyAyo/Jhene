import { SEND_MESSAGE } from '../actions/sendAction';

const initialState = {

}

const messagesReducer = (state = initialState, {type,payload} ) => {
    switch(type){
        case SEND_MESSAGE:
            return {
                data : payload.data
            }
        default :
            return state
    }
};

export default messagesReducer;