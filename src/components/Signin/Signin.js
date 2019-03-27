import React from 'react'
import {routeChanged} from '../../actions.js'
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


const Signin = ({onRouteChange}) => {

	return (
		<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
			<main className="pa4 black-80">
			  <form className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f1 fw6 ph0 mh0 ttu">Sign In</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" for="email-address">Email</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" for="password">Password</label>
			        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
			      </div>
			      <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
			    </fieldset>
			    <div className="">
			      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" onClick={signIn} />
			    </div>
			    <div className="lh-copy mt3">
			      <p onClick={register} className="f6 link black db grow pointer">Register</p>
			    </div>
			  </form>
			</main>
		</article>
	)

	function signIn(){
		routeTo = 'home'
		onRouteChange()
	}
	function register(){
		routeTo = 'register'
		onRouteChange()
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(Signin)