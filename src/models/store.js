import {createStore, applyMiddleware} from 'redux';
// import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducers from './reducers/index';


const middleware = [thunk];

// if(process.env.NODE_ENV !== 'production'){
//     middleware.push(createLogger());
// }

export const store = createStore(
    rootReducers,
    applyMiddleware(...middleware)
)