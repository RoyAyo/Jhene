import {INITIALIZE_USER} from '../actions/users';

const initial_state = {
    user : null
}

const userReducer = (state=initial_state,{type,payload}) => {
    switch(type){
        case INITIALIZE_USER:
            return {
                ...state,
                user : payload
            }
        default :
            return state
    }
}

export default userReducer;