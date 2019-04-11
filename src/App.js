/*
 Created by Harry Parkinson: 2019
*/
import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import Rank from './components/Rank/Rank.js'
import Signin from './components/Signin/Signin.js'
import Register from './components/Register/Register.js'
import Particles from 'react-particles-js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import { particleOptions } from './particleOptions.js'
import {routeChanged, inputChanged, requestFaceMatch, userChanged} from './actions.js'

//Initializing state through redux
const mapStateToProps = (state) => {
  return {
    route: state.routeChanged.route,
    isSignedIn: state.routeChanged.isSignedIn,
    inputField: state.inputChanged.inputField,
    isPending: state.requestFaceMatch.isPending,
    faceBox: state.requestFaceMatch.faceBox,
    err: state.requestFaceMatch.err,
    user: state.userChanged.user
  }
}

//Initialising redux functions
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onInputChange: (event) => dispatch(inputChanged(event.target.value)),
    onRequestFaceMatch: () => dispatch(requestFaceMatch()),
    onRouteChange: () => dispatch(routeChanged()),
    onRegister: () => dispatch(userChanged())
  }
}
 
class App extends Component {

  //Render the app
  render() {
    // Get state const's to pass to the required components
    const { route, user, isSignedIn, inputField, onInputChange, onRequestFaceMatch, onRouteChange, faceBox} = this.props
    console.log(user)
    return (
      <div className="App">
        {/* Load particles third party background, view file particleOptions.js for config*/}
        <Particles className='particles'
          params={particleOptions}/>
        {/*Navigation is loaded regardless of which view we wish to load*/}
        <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} onSignOut={userChanged} />
        {
          //Simple if statement to decide which view to load
          // Sign in view is default
          route === 'register' ? 
            <Register/>
          : (route === 'home' ?
              <div>
                <Logo />
                <Rank name={user.name} entries={user.entries}/>
                <ImageLinkForm onInputChange={onInputChange} onRequestFaceMatch={onRequestFaceMatch} inputField={inputField} id={user.id}/>
                <FaceRecognition imageUrl={inputField} faceBox={faceBox} />
              </div>
            : <Signin/>
            )
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
