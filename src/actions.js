import {
	REQUEST_FACE_MATCH_PENDING,
	REQUEST_FACE_MATCH_SUCCESS,
	REQUEST_FACE_MATCH_FAILED,
	INPUT_CHANGED,
	USER_CHANGED,
	RESET_BOX
	//ROUTE_CHANGED
} from './constants.js'

export const requestFaceMatch = (url, id) => (dispatch) => {
	if(url === ''){
		dispatch({type: RESET_BOX})
	} else {
		dispatch({ type: REQUEST_FACE_MATCH_PENDING })
		fetch('https://still-hamlet-40609.herokuapp.com/imageUrl', {
  		method: 'post',
  		headers: {'Content-Type': 'application/json'},
  		body: JSON.stringify({
  			input: url
  		})
  	})
  	.then(response => response.json())
    .then(response => {
    	dispatch({ type: REQUEST_FACE_MATCH_SUCCESS, payload: response })
    	fetch('https://still-hamlet-40609.herokuapp.com/image', {
    		method: 'put',
    		headers: {'Content-Type': 'application/json'},
    		body: JSON.stringify({
    			id: id
    		})
    	}).then(
	    		setTimeout(() => {
		    		fetch('https://still-hamlet-40609.herokuapp.com/profile/'+id)
		    		.then(res => res.json())
		    		.then(data => dispatch(userChanged(data)))  
		    		.catch(console.log('Failed to get users updated profile'))
		    		}, 500))
    		.catch(console.log('Failed to update users score'))
    		
   	})
    .catch(err => dispatch({ type: REQUEST_FACE_MATCH_FAILED, payload: err }))
	}

}

export const inputChanged = (text) => (dispatch) => {
	dispatch(requestFaceMatch('', ''))
	dispatch({type: INPUT_CHANGED, payload: text})
}

export const routeChanged = (route) => (dispatch) => {
	if(route === 'signIn'){
		const user = {
			id: '',
			name: '',
			email: '', 
			entries: 0, 
			joined: ''
		}
		const inputField = 'https://thenypost.files.wordpress.com/2019/02/daniel-radcliffe-1a.jpg?quality=90&strip=all&strip=all'
		dispatch(inputChanged(inputField))
		dispatch(userChanged(user))
		dispatch(requestFaceMatch('', ''))
	}
	dispatch({type: 'ROUTE_CHANGED', payload: route})
}

export const userChanged = (user) => ({
	type: USER_CHANGED,
	payload: user
})