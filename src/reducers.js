import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import RedditReducers from './RedditPosts/reducers'


export const RootReducers = (asyncReducers) => {
    return combineReducers({
                router,
                RedditReducers,
                ...asyncReducers
    })
}


export default RootReducers