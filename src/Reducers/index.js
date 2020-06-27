import {combineReducers} from 'redux';
import postsReducer from "./PostsReducer";
import userReducer from "./UsersReducer"

export default combineReducers({
    posts: postsReducer,
    users: userReducer 
});