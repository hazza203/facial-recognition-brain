/*
	This is the navigation component, the navigation is dependant on
	which view is currently loaded
*/

import React from 'react'
import './Navigation.css'
import { routeChanged, userChanged } from '../../actions.js'
import { connect } from 'react-redux'

// Default values, routeTo determins which view to load next
// and an empty user for when the user signs out
let routeTo = ''
const user = {
	id: '',
	name: '',
	email: '', 
	entries: 0, 
	joined: ''
}

// Need redux state and dispatch to props here to be able to pass values to 
// the respected functions

const mapStateToProps = (state) => {
  return {
    route: state.routeChanged.route,
    user: state.userChanged.user

  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onRouteChange: () => dispatch(routeChanged(routeTo)),
    onSignOut: () => dispatch(userChanged(user))
  }
}

const Navigation = ({onRouteChange, isSignedIn, onSignOut}) => {

	// If signed in, show the signOut button on the nav
	// else show the signIn and register buttons
	if(isSignedIn){
		return(
			<nav>
				<p className='f3 link dim black underline pa3 pointer' onClick={() => {routeTo='signIn';onRouteChange()}} > Sign Out </p>
			</nav>
		)
	} else {
		return(
			<nav>
				<p className='f3 link dim black underline pa3 pointer' onClick={() => {routeTo='signIn';onRouteChange()}} > Sign In </p>
				<p className='f3 link dim black underline pa3 pointer' onClick={() => {routeTo='register';onRouteChange()}} > Register </p>
			</nav>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)