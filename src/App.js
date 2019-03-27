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

import {routeChanged, inputChanged, requestFaceMatch} from './actions.js'

const mapStateToProps = (state) => {
  return {
    route: state.routeChanged.route,
    isSignedIn: state.routeChanged.isSignedIn,
    inputField: state.inputChanged.inputField,
    isPending: state.requestFaceMatch.isPending,
    faceBox: state.requestFaceMatch.faceBox,
    err: state.requestFaceMatch.err
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onInputChange: (event) => dispatch(inputChanged(event.target.value)),
    onRequestFaceMatch: () => dispatch(requestFaceMatch()),
    onRouteChange: () => dispatch(routeChanged())
  }
}

class App extends Component {

  render() {
    const { route, isSignedIn, inputField, onInputChange, onRequestFaceMatch, onRouteChange, faceBox} = this.props
    return (
      <div className="App">
        <Particles className='particles'
          params={particleOptions}/>
        <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
        {
          route === 'register' ? 
            <Register onRouteChange={onRouteChange} />
          : (route === 'home' ?
              <div>
                <Logo />
                <Rank />
                <ImageLinkForm onInputChange={onInputChange} onRequestFaceMatch={onRequestFaceMatch} inputField={inputField}/>
                <FaceRecognition imageUrl={inputField} faceBox={faceBox} />
              </div>
            : <Signin onRouteChange={onRouteChange} />
            )
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
