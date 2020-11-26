import { createStore,combineReducers,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import messagesReducer from '../reducers/messages';

// const reducer = combineReducers({
//     messages : messagesReducer
// });

const store = createStore(messagesReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;