import React from 'react'
import './Navigation.css'
import { routeChanged } from '../../actions.js'
import { connect } from 'react-redux'

let routeTo = ''

const mapStateToProps = (state) => {
  return {
    route: state.routeChanged.route,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onRouteChange: () => dispatch(routeChanged(routeTo))
  }
}

const Navigation = ({onRouteChange, isSignedIn}) => {
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
		onRouteChange()
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)