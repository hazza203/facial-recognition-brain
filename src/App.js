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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onInputChange: (event) => dispatch(inputChanged(event.target.value)),
    onRequestFaceMatch: () => dispatch(requestFaceMatch()),
    onRouteChange: () => dispatch(routeChanged()),
    onRegister: () => dispatch(userChanged())
  }
}
 
class App extends Component {

  componentDidMount(){
    
  }

  render() {
    const { route, user, isSignedIn, inputField, onInputChange, onRequestFaceMatch, onRouteChange, faceBox} = this.props
    console.log(user)
    return (
      <div className="App">
        <Particles className='particles'
          params={particleOptions}/>
        <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} onSignOut={userChanged} />
        {
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
