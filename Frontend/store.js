import { createStore } from 'redux';
import appReducer from './reducers/appReducer';
// Current logic from unit, but I think not needed because I will only be using one reducer
// import reducers from './reducers/index';

// TODO: Explain init process of createStore when application starts,
//       and also during subsequent dispatch calls
const store = createStore(
    // Current logic from unit, but I think not needed because I will only be using one reducer
    // reducers
    appReducer
  );
  
  export default store;