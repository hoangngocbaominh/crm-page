import {combineReducers} from 'redux';
import authReducer from './authReducer';



const rootReducers = combineReducers ( {
   token: authReducer,
})

export default rootReducers;