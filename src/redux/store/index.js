import { createStore,combineReducers,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import messagesReducer from '../reducers/messages';

// const reducer = combineReducers({
//     messages : messagesReducer
// });

const store = createStore(messagesReducer,applyMiddleware(thunk));

export default store;