import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import thunk from "redux-thunk";
import { rootReducer } from "../Redux/Reducer/index";
import logger from "redux-logger";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const persistConfig = {
  key: "libra",
  storage,
  debut: true, //why?
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStorage = () => {
  let store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk, logger))
    // applyMiddleware(thunk)
  );
  let persistor = persistStore(store);
  return { store, persistor };
};