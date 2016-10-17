import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import RedditReducers from './RedditPosts/reducers'
const loggerMiddleware = createLogger()
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools({
    // Specify here name, actionsBlacklist, actionsCreators and other options
});


export default function configureStore(initialState, ) {
    return createStore(
        RedditReducers,
        initialState,
        composeEnhancers(
            applyMiddleware(
                thunkMiddleware,
                loggerMiddleware
            ),
            // other store enhancers if any
        )
    )
}
