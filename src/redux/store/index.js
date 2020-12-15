import { createStore,applyMiddleware,combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import messagesReducer from '../reducers/messages';
import userReducer from '../reducers/users';

const appReducer = combineReducers({
    message : messagesReducer,
    user : userReducer
});

const store = createStore(appReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;