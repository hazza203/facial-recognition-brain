import Clarifai from 'clarifai'
import {
	REQUEST_FACE_MATCH_PENDING,
	REQUEST_FACE_MATCH_SUCCESS,
	REQUEST_FACE_MATCH_FAILED,
	INPUT_CHANGED,
	USER_CHANGED,
	//ROUTE_CHANGED
} from './constants.js'

const app = new Clarifai.App({
 apiKey: 'b2bd4639952d42cbbca1c63efeed65af'
});

export const requestFaceMatch = (url) => (dispatch) => {
	dispatch({ type: REQUEST_FACE_MATCH_PENDING })
	app.models
      .predict( Clarifai.FACE_DETECT_MODEL, url )
      .then(response => dispatch({ type: REQUEST_FACE_MATCH_SUCCESS, payload: response }))
      .catch(err => dispatch({ type: REQUEST_FACE_MATCH_FAILED, payload: err }))
}

export const inputChanged = (text) => ({
	type: INPUT_CHANGED,
	payload: text
})

export const routeChanged = (route) => ({
	type: 'ROUTE_CHANGED',
	payload: route
})

export const userChanged = (user) => ({
	type: USER_CHANGED,
	payload: user
})