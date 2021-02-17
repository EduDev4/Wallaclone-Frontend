import { createStore, combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import rootReducer from './reducers/index';

export default function configureStore({ history }) {
  const reducer = combineReducers({
    router: connectRouter(history),
    root: rootReducer,
  });

  const store = createStore(reducer);
  return store;
}
