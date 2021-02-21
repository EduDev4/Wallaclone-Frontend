import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

// import rootReducer from './reducers/index';

import * as reducers from './reducers';

const reducer = combineReducers(reducers);

export default function configureStore(preloadedState) {
  const store = createStore(reducer, preloadedState, composeWithDevTools());
  return store;
}

// export default function configureStore(preloadedState, { history }) {
//   const reducer = combineReducers({
//     router: connectRouter(history),
//     root: rootReducer,
//   });
//
//   // TODO: Añadir metodos del api cuando esté finalizada
//
//   const middlewares = [
//     routerMiddleware(history),
//     thunk.withExtraArgument({ history }),
//   ];
//   const store = createStore(
//     reducer,
//     preloadedState,
//     composeWithDevTools(applyMiddleware(...middlewares)),
//   );
//   return store;
// }
