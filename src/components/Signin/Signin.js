/*
	Component which displays signing component and handles signin
*/

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

// Validates all fields and returns an object contiains each field
// and whether it is valid or not
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
			//When touched is false, it means we have not
			//touched it yet and there is no need to display 
			//an error message/color
		 	touched: {
        signInEmail: false,
        signInPassword: false,
      },
      failedSignin: false,
		}
	}

	//State setters for each value
  onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value})
	}

	// Changes the touched value in state signifying that the element
	// has been touched and we can no display error message if it exists
	handleBlur = (field) => (event) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }



	render() {
		const {onRouteChange, onSignin} = this.props
		const { signInEmail, signInPassword, failedSignin } = this.state;
		const errors = validate(signInEmail, signInPassword);
    const isDisabled = Object.keys(errors).some(x => errors[x]);

		// Function returning if we should show an error for the field passed
		const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };

    //Send signing request to server then change the user in the state and login on success
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
					console.log(data)
					if(data.id) {
						user = data
						routeTo = 'home'
						onSignin()
						onRouteChange()
					} else {
						this.setState({failedSignin: true})
					}
				})
				.catch(err => {
					console.log(err)
				})
		}

		return (
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0 ttu">Sign In</legend>
				      <div className="mt3">
					      {
									failedSignin && <label style={{backgroundColor: '#FF7D32'}} className="white br4 db fw6 ma2 pa2 lh-copy f6" htmlFor="pError">Sorry, either the password or email are incorrect. If you don't have an account please register.</label>
								}
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        {/*onBlur = Has been touched*/}
				        {/*style = If error, orange border, else normal black*/}
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	onBlur={this.handleBlur('signInEmail')}
				        	style={shouldMarkError('signInEmail') ? {border: '1px solid #FF7D32'} : {border: '1px solid black'}} 
				        	type="email" name="email-address" id="email-address" 
				        	onChange={this.onEmailChange}/>
					        {
					        	//Show error message if there is an error
		            		shouldMarkError('signInEmail') &&
		            		<label className="db fw6 lh-copy f6" htmlFor="pError">Invalid email</label>
		            	}
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				      	{/*onBlur = Has been touched*/}
				        {/*style = If error, orange border, else normal black*/}
				        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
				        	onBlur={this.handleBlur('signInPassword')}
				        	style={shouldMarkError('signInPassword') ? {border: '1px solid #FF7D32'} : {border: '1px solid black'}}  
				        	type="password" name="password"  id="password"
				        	onChange={this.onPasswordChange} 
				        	onKeyPress={event => {
				        		//Last field - if user hits enter, submit
		                if (event.key === 'Enter') {
		                  onSubmitSignIn()
		                }}
		               }/>
	            	{
	            		//Show error message if there is an error
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
				      <p onClick={() => {routeTo='register'; onRouteChange()}} className="f6 link black db grow pointer">Register</p>
				    </div>
				  </div>
				</main>
			</article>
		)
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(Signin)