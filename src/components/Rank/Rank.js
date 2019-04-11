import React from 'react'

// Component to display the rank and num of entries the user has
// It is passed the users name and entries

const Rank = ({name, entries}) => {

	return (
		<div>
			<div className='white f3'>
				{name + ', your current score is...'}
			</div>
			<div className='white f1'>
				{entries}
			</div>
		</div>
	)
}

export default Rank