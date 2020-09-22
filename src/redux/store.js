import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";

import plantReducer from "./reducers/plantReducer";
import userReducer from "./reducers/userReducer";

const middleware = [thunk];

const reducers = combineReducers({
  plants: plantReducer,
  user: userReducer
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducers, enhancer);

export default store;
