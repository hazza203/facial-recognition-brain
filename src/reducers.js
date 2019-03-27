import { 
	INPUT_CHANGED, 
	REQUEST_FACE_MATCH_PENDING,
	REQUEST_FACE_MATCH_SUCCESS,
	REQUEST_FACE_MATCH_FAILED
} from './constants.js'

const initial_face_match_state = {
	faceBox: [],
	isPending: false,
	err: ""
}

export const requestFaceMatch = ( state=initial_face_match_state, action={} ) => {
	switch(action.type){
		case REQUEST_FACE_MATCH_PENDING:
			return Object.assign({}, state, {isPending:true})
		case REQUEST_FACE_MATCH_SUCCESS: {
			const clarifaiFace = action.payload.outputs[0].data.regions[0].region_info.bounding_box
			const image = document.getElementById('inputImage')
			const width = Number(image.width)
 			const height = Number(image.height)
 			const area = {
 				leftCol: clarifaiFace.left_col * width,
 				topRow: clarifaiFace.top_row * height,
 				rightCol: width - (clarifaiFace.right_col * width),
 				bottomRow: height - (clarifaiFace.bottom_row * height)
 			}

			return Object.assign({}, state, {faceBox: area, isPending:false})
		}
		case REQUEST_FACE_MATCH_FAILED:
			return Object.assign({}, state, {err: action.payload, isPending:false})
		default:
			return state
	}
}

const initial_input_state = {
	inputField: 'https://thenypost.files.wordpress.com/2019/02/daniel-radcliffe-1a.jpg?quality=90&strip=all&strip=all'
}

export const inputChanged = ( state=initial_input_state, action={} ) => {
	switch(action.type){
		case INPUT_CHANGED:
			return Object.assign({}, state, {inputField: action.payload})
		default: 
			return state
	}
}