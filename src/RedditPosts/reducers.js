import {
    SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT,
    REQUEST_POSTS, RECEIVE_POSTS
} from './actionTypes'

function posts(state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) {
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            })
        default:
            return state
    }
}

const ACTION_HANDLERS = {
    INVALIDATE_SUBREDDIT: (state, action) => {
        return Object.assign({}, state, {
            selectedSubreddit: state.selectedSubreddit,
            postsBySubreddit: {
                [state.selectedSubreddit]: posts(state.postsBySubreddit[state.selectedSubreddit], action)
            }
        })
    },
    REQUEST_POSTS: (state, action) => {
        let prevPostsBySubreddit = state.postsBySubreddit[state.selectedSubreddit]
        let prevSubreddit = state.selectedSubreddit

        return Object.assign({}, state, {
            selectedSubreddit: state.selectedSubreddit,
            postsBySubreddit: {
                [state.selectedSubreddit]: posts(state.postsBySubreddit[state.selectedSubreddit], action),
                [prevSubreddit]: posts(prevPostsBySubreddit, action)
            }
        })
    },
    RECEIVE_POSTS: (state, action) => {
        return Object.assign({}, state, {
            selectedSubreddit: state.selectedSubreddit,
            postsBySubreddit: {
                [state.selectedSubreddit]: posts(state.postsBySubreddit[state.selectedSubreddit], action)
            }
        })
    },
    SELECT_SUBREDDIT: (state, action) => {
        let prevSubredditPosts = state.postsBySubreddit[Object.keys(state.postsBySubreddit)[0]]
        return Object.assign({}, state, {
            selectedSubreddit: action.subreddit,
            postsBySubreddit: Object.assign({}, state.postsBySubreddit, {
                    [action.subreddit]: posts(state.postsBySubreddit[action.subreddit], action),
                    [state.selectedSubreddit]: prevSubredditPosts
                }),
        })
    }

}

const initialState = {
    postsBySubreddit: {},
    selectedSubreddit: 'reactjs'
}

export default (state = initialState, action) => {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
