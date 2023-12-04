import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import authReducer from '../reducer/authReducer'

const store = createStore(combineReducers({ 'authReducer': authReducer }), applyMiddleware(thunk));

export default store;
