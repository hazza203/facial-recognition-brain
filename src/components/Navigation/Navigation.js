import React from 'react'
import './Navigation.css'
import { routeChanged, userChanged } from '../../actions.js'
import { connect } from 'react-redux'

let routeTo = ''
let user = {
	id: '',
	name: '',
	email: '', 
	entries: 0, 
	joined: ''
}


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

	if(isSignedIn){
		return(
			<nav>
				<p className='f3 link dim black underline pa3 pointer' onClick={signOut} > Sign Out </p>
			</nav>
		)
	} else {
		return(
			<nav>
				<p className='f3 link dim black underline pa3 pointer' onClick={signIn} > Sign In </p>
				<p className='f3 link dim black underline pa3 pointer' onClick={register} > Register </p>
			</nav>
		)
	}

	function signIn(){
		routeTo = 'signIn'
		onRouteChange()
	}
	function register(){
		routeTo = 'register'
		onRouteChange()
	}
	function signOut(){
		routeTo = 'signIn'
		onSignOut()
		onRouteChange()
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)