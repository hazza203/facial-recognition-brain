import React from 'react'
import './ImageLinkForm.css'
import {requestFaceMatch} from '../../actions.js'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    inputField: state.inputChanged.inputField,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onRequestFaceMatch: () => dispatch(requestFaceMatch(ownProps.inputField))
  }
}

const ImageLinkForm = ({onInputChange, onRequestFaceMatch}) => {
	return (
		<div>
			<p className='f3'>
				{'This Magic Brain will detect faces in your pictures. Give it a try'}
			</p>
			<div className='center'>
				<div className='form center pa4 br3 shadow-5'>
					<input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} />
					<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onRequestFaceMatch} >Detect</button>
				</div>
			</div>
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageLinkForm)