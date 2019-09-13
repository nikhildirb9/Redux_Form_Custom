import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as formReducer } from 'redux-form';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import { user } from './components/UserReducers';

export let persistor;

export default function configureStore(initialState) {
    const rootReducer = combineReducers({
        user,
        form: formReducer,
    });

    const composeEnhancers = composeWithDevTools({
        latency: 2000,
    }) || compose;

    const persistConfig = {
        key: 'root',
        storage: storageSession,
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store = createStore(
        persistedReducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk)),
    );
    persistor = persistStore(store);

    return store;
}
