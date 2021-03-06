import * as actions from './actions'

const initialState = {
    username: '',
    selectedRepo: {},
    showLoading: false,
    error: '',
    commitContainer: { repo: '', pageInfo: { hasNextPage: false, endCursor: null }, commits: [] },
    repoContainer: { pageInfo: { hasNextPage: false, endCursor: null }, repos: [] }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.SELECT_USER:
            return { ...state, username: action.payload };        
        case actions.SHOW_LOADING:
            return { ...state, showLoading: action.payload }            
        case actions.RESET_STATE:
            return {...initialState}
        case actions.SET_ERROR:
            return { ...state, error: action.payload }
        case actions.GET_REPOS:
            return { ...state, repoContainer: { ...state.repoContainer,
                    pageInfo: { ...state.repoContainer.pageInfo,
                        hasNextPage: action.payload.pageInfo.hasNextPage, 
                        endCursor: action.payload.pageInfo.endCursor 
                    }, 
                    repos: state.repoContainer.repos.concat(action.payload.repos) 
                } 
            }
        case actions.GET_COMMITS:
            return { ...state, commitContainer: { ...state.commitContainer,
                    repo: action.payload.repo,
                    pageInfo: { ...state.commitContainer.pageInfo,
                        hasNextPage: action.payload.pageInfo.hasNextPage, 
                        endCursor: action.payload.pageInfo.endCursor 
                    }, 
                    commits: state.commitContainer.commits.concat(action.payload.commits) 
                } 
            }
        case actions.RESET_COMMITS:
            return { ...state, commitContainer: initialState.commitContainer }                        
        default:
            return state
    }
}
