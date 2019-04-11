/*
	Component which displays the register view and handes registration
*/

import React from 'react'
import { routeChanged, userChanged} from '../../actions.js'
import { connect } from 'react-redux'

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
    onRouteChange: () => dispatch(routeChanged('home')),
    onRegister: () => dispatch(userChanged(user))
  }
}

// Validates all fields and returns an object contiains each field
// and whether it is valid or not
function validate(email, password, name) {
	let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
  // true means invalid, so our conditions got reversed

  return {
    email: email.length === 0 || !email.includes('@') || !email.includes('.', email.indexOf('@')),
    password: password.length < 8 || !strongRegex.test(password),
    name: name.length < 3
  };
}


class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			name: '',
			//When touched is false, it means we have not
			//touched it yet and there is no need to display 
			//an error message/color
		 	touched: {
        email: false,
        password: false,
      }
		}
	}

	//State setters for each value
  onEmailChange = (event) => {
		this.setState({email: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({password: event.target.value})
	}

	onNameChange = (event) => {
		this.setState({name: event.target.value})
	}

	// Changes the touched value in state signifying that the element
	// has been touched and we can no display error message if it exists
	handleBlur = (field) => (event) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }

	render() {
		const {onRouteChange, onRegister} = this.props
		const {name, email, password} = this.state
		const errors = validate(email, password, name);
    const isDisabled = Object.keys(errors).some(x => errors[x]);

    // Function returning if we should show an error for the field passed
		const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };

    //Send register request to server then change user in the state and login on success
		const onSubmitRegister = () => {
			fetch('https://still-hamlet-40609.herokuapp.com/register', {
				method: 'post',
				headers: {'Content-Type' : 'application/json'},
				body: JSON.stringify({
					email: email,
					password: password,
					name: name
				})
			}).then(response => response.json())
				.then(data => {
					if(data) {
						user = data
						onRegister()
						onRouteChange()
					}
				})
		}

		//Render the component
		return (
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0 ttu">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
				        {/*onBlur = Has been touched*/}
				        {/*style = If error, orange border, else normal black*/}
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	onBlur={this.handleBlur('name')}
				        	style={shouldMarkError('name') ? {border: '1px solid #FF7D32'} : {border: '1px solid black'}}
				        	onChange={this.onNameChange}
				        	type="text" name="name"  id="name" />
			        	{
			        		//Show error message if there is an error
            			shouldMarkError('name') &&
            			<label className="db fw6 lh-copy f6" htmlFor="pError">Name should have minimum 3 chars</label>
	            	}
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				    	  {/*onBlur = Has been touched*/}
				        {/*style = If error, orange border, else normal black*/}
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				       		onBlur={this.handleBlur('email')}
				        	style={shouldMarkError('email') ? {border: '1px solid #FF7D32'} : {border: '1px solid black'}}
				        	onChange={this.onEmailChange}
				        	type="email" name="email-address"  id="email-address" />
				        	{
				        		//Show error message if there is an error
		            		shouldMarkError('email') &&
		            		<label className="db fw6 lh-copy f6" htmlFor="pError">Invalid email</label>
		            	}
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				    	  {/*onBlur = Has been touched*/}
				        {/*style = If error, orange border, else normal black*/}
				        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	onBlur={this.handleBlur('password')}
				        	style={shouldMarkError('password') ? {border: '1px solid #FF7D32'} : {border: '1px solid black'}}
				        	onChange={this.onPasswordChange}
				        	type="password" name="password"  id="password" 
				        	onKeyPress={event => {
				        		//Last field - if user hits enter, submit
		                if (event.key === 'Enter') {
		                  onSubmitRegister()
		                }}
		               }/>
		              {
		              	//Show error message if there is an error
	            			shouldMarkError('password') &&
	            			<label className="db fw6 lh-copy f6" htmlFor="pError">Invalid password</label>
	            		}
				      </div>
				      <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
				    </fieldset>
				    <div className="">
				      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      	disabled={isDisabled}
				      	type="submit" value="Register Now!" onClick={onSubmitRegister} />
				    </div>
				  </div>
				</main>
			</article>
		)		
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(Register)