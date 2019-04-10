import React from 'react'
import {routeChanged, userChanged} from '../../actions.js'
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
  	user: state.userChanged.user,
    route: state.routeChanged.route
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onRouteChange: () => dispatch(routeChanged(routeTo)),
    onSignin: () => dispatch(userChanged(user))
  }
}

function validate(email, password) {
  // true means invalid, so our conditions got reversed

  return {
    signInEmail: email.length === 0 || !email.includes('@') || !email.includes('.', email.indexOf('@')),
    signInPassword: password.length < 8,
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
		const {onRouteChange, onSignin} = this.props
		const { signInEmail, signInPassword } = this.state;
		const errors = validate(signInEmail, signInPassword);
    const isDisabled = Object.keys(errors).some(x => errors[x]);

		const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };

		const onSubmitSignIn = () => {
			fetch('https://still-hamlet-40609.herokuapp.com/signin', {
				method: 'post',
				headers: {'Content-Type' : 'application/json'},
				body: JSON.stringify({
					email: signInEmail,
					password: signInPassword
				})
			}).then(response => response.json())
				.then(data => {
					if(data.id) {
						user = data
						routeTo = 'home'
						onSignin()
						onRouteChange()
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
				        	style={shouldMarkError('signInEmail') ? {border: '1px solid #FF7D32'} : {border: '1px solid black'}} 
				        	type="email" name="email-address" id="email-address" 
				        	onChange={this.onEmailChange}/>
					        {
		            		shouldMarkError('signInEmail') &&
		            		<label className="db fw6 lh-copy f6" htmlFor="pError">Invalid email</label>
		            	}
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
				        	onBlur={this.handleBlur('signInPassword')}
				        	style={shouldMarkError('signInPassword') ? {border: '1px solid #FF7D32'} : {border: '1px solid black'}}  
				        	type="password" name="password"  id="password"
				        	onChange={this.onPasswordChange} 
				        	onKeyPress={event => {
		                if (event.key === 'Enter') {
		                  onSubmitSignIn()
		                }}
		               }/>
	            	{
	            		shouldMarkError('signInPassword') &&
	            		<label className="db fw6 lh-copy f6" htmlFor="pError">Invalid password</label>
	            	}
                
				      </div>
				      <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
				    </fieldset>
				    <div className="">
				      <input disabled={isDisabled} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      	type="submit" value="Sign in" onClick={onSubmitSignIn} />
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