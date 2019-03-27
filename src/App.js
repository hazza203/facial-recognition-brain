import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import Rank from './components/Rank/Rank.js'
import Particles from 'react-particles-js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import { particleOptions } from './particleOptions.js'

import {inputChanged, requestFaceMatch} from './actions.js'

const mapStateToProps = (state, ownProps) => {
  return {
    inputField: state.inputChanged.inputField,
    isPending: state.requestFaceMatch.isPending,
    faceBox: state.requestFaceMatch.faceBox,
    err: state.requestFaceMatch.err
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onInputChange: (event) => dispatch(inputChanged(event.target.value)),
    onRequestFaceMatch: () => dispatch(requestFaceMatch())
  }
}

class App extends Component {

  render() {
    const { inputField, onInputChange, onRequestFaceMatch, faceBox} = this.props

    return (
      <div className="App">
        <Particles className='particles'
          params={particleOptions}
        />
        <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onRequestFaceMatch={onRequestFaceMatch} inputField={inputField}/>
      <FaceRecognition imageUrl={inputField} faceBox={faceBox} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
