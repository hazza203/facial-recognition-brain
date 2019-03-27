import React from 'react'
import './FaceRecognition.css'

const FaceRecognition = ({imageUrl, faceBox}) => {

	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='inputImage' src={imageUrl} alt='User upload' width='500px' height='auto'/>
				<div className='bounding-box' 
					style={{top: faceBox.topRow, right: faceBox.rightCol, bottom: faceBox.bottomRow, left: faceBox.leftCol }}>
				</div>
			</div>
		</div>
	)
}



export default FaceRecognition