import { createStore,combineReducers } from 'redux';

import messagesReducer from '../reducers/messages';

const reducer = combineReducers({
    messages : messagesReducer
});

const initialState = {
    messages : []
};

const store = createStore(reducer,initialState);

export default store;