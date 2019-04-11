/*
	Redux actions file. Each state change through react redux goes through these
	functions before the state is eventually changed by dispatching to the reducer
*/

import {
	REQUEST_FACE_MATCH_PENDING,
	REQUEST_FACE_MATCH_SUCCESS,
	REQUEST_FACE_MATCH_FAILED,
	INPUT_CHANGED,
	USER_CHANGED,
	RESET_BOX
	//ROUTE_CHANGED
} from './constants.js'

/* 
Executed when user clicked the submit button to match a face with a loaded 
image, here we make several server requests:
	1: Clarifai API call
	2: If successful update users entries count
	3: Load new user entry count
 */

export const requestFaceMatch = (url, id) => (dispatch) => {
	// If no url, we reset the box shown
	// This is called when a user signs out so that the next user that 
	// signs in does not see the box from the last user. 
	if(url === ''){
		dispatch({type: RESET_BOX})
	} else {
		//Dispatch the pending status to state
		dispatch({ type: REQUEST_FACE_MATCH_PENDING })
		//Send the url to the server to process the clarifai api call
		fetch('https://still-hamlet-40609.herokuapp.com/imageUrl', {
  		method: 'post',
  		headers: {'Content-Type': 'application/json'},
  		body: JSON.stringify({
  			input: url
  		})
  	})
  	// The response contains the box of the face if it exists
  	// Dispatch the result to state
  	.then(response => response.json())
    .then(response => {
    	dispatch({ type: REQUEST_FACE_MATCH_SUCCESS, payload: response })
    	// Request server to update this users entries count
    	fetch('https://still-hamlet-40609.herokuapp.com/image', {
    		method: 'put',
    		headers: {'Content-Type': 'application/json'},
    		body: JSON.stringify({
    			id: id
    		})
    	}).then(
    			// Time out to make sure the last fetch executes in time before requesting 
    			// the updated information
	    		setTimeout(() => {
	    			// Get updated user information (mainly for the entries count)
		    		fetch('https://still-hamlet-40609.herokuapp.com/profile/'+id)
		    		.then(res => res.json())
		    		.then(data => dispatch(userChanged(data)))  
		    		.catch(console.log('Failed to get users updated profile'))
		    		}, 500))
    		.catch(console.log('Failed to update users score'))
    		
   	})
   	//Catch face match error
    .catch(err => dispatch({ type: REQUEST_FACE_MATCH_FAILED, payload: err }))
	}

}

// Get called each time the Image url input changes
// We dispatch requestFaceMatch here as we don't want the box 
// visable while the user is changing images
export const inputChanged = (text) => (dispatch) => {
	dispatch(requestFaceMatch('', ''))
	dispatch({type: INPUT_CHANGED, payload: text})
}

/*
Handles route change
Sets to default empty user if we signedOut (en route to signIn) and
resets the input field and removes the box from the image
*/

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

// Dispatches the changed user, executed from login or registers
export const userChanged = (user) => ({
	type: USER_CHANGED,
	payload: user
})