import React from 'react'
import {routeChanged} from '../../actions.js'
import { connect } from 'react-redux'
import './Signin.css'

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

function validate(email, password) {
  // true means invalid, so our conditions got reversed

  return {
    signInEmail: email.length === 0 || !email.includes('@'),
    signInPassword: password.length < 4,
  };
}

class Signin extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: '',
		 	touched: {
        signInEmail: false,
        signInPassword: false,
      }
		}
	}

  onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value})
	}

	handleBlur = (field) => (event) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }



	render() {

		const { onRouteChange } = this.props

		const { signInEmail, signInPassword } = this.state;
		const errors = validate(signInEmail, signInPassword);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
		const shouldMarkError = (field) => {
			console.log(errors)
			console.log(field)
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };

		const signIn = () => {
			fetch('http://localhost:3000/signin', {
				method: 'post',
				headers: {'Content-Type' : 'application/json'},
				body: JSON.stringify({
					email: signInEmail,
					password: signInPassword
				})
			}).then(response => response.json())
				.then(data => {
					if(data === 'success') {
						routeTo = 'home'
						onRouteChange()
					} else {

					}
				})
		}

		const register = () =>{
			routeTo = 'register'
			onRouteChange()
		}
		return (
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0 ttu">Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	onBlur={this.handleBlur('signInEmail')}
				        	style={shouldMarkError('signInEmail') ? {border: '1px solid red'} : {border: '1px solid black'}} 
				        	type="email" name="email-address" id="email-address" 
				        	onChange={this.onEmailChange}/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
				        	onBlur={this.handleBlur('signInPassword')}
				        	style={shouldMarkError('signInPassword') ? {border: '1px solid red'} : {border: '1px solid black'}}  
				        	type="password" name="password"  id="password"
				        	onChange={this.onPasswordChange} 
				        	onKeyPress={event => {
		                if (event.key === 'Enter') {
		                  signIn()
		                }}
		               }/>
				      </div>
				      <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
				    </fieldset>
				    <div className="">
				      <input disabled={isDisabled} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" onClick={signIn} />
				    </div>
				    <div className="lh-copy mt3">
				      <p onClick={register} className="f6 link black db grow pointer">Register</p>
				    </div>
				  </div>
				</main>
			</article>
		)
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(Signin)