import _ from "lodash";
import jsonPlaceHolder from "../Apis/JSONplaceholder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());

    const userIds = _.uniq(_.map(getState().posts, 'userId'));
    userIds.forEach(id => {dispatch(fetchUser(id))});   
    
    //OPTIONAL - does the same thing as above
    // _.chain(getState().posts)
    //     .map('userId')
    //     .uniq()
    //     .forEach(id => dispatch(fetchUser(id)))
    //     .value()
}

export const fetchPosts = () => async dispatch =>{
    const response = await jsonPlaceHolder.get("/posts");

    dispatch({type: 'FETCH_POSTS', payload: response.data})
};

export const fetchUser = (id) => async dispatch => {
    const response = await jsonPlaceHolder.get(`/users/${id}`);

    dispatch({type:'FETCH_USER', payload: response.data})
}

// MEMOIZE VERSION
// export const fetchUser = (id) => async dispatch => {
//     _fetchUser(id, dispatch)
// }
// const _fetchUser = _.memoize(async (id, dispatch)=>{
//     const response = await jsonPlaceHolder.get(`/users/${id}`);

//     dispatch({type:'FETCH_USER', payload: response.data})
// })