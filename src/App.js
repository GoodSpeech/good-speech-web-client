import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import speechRecognition from './services/speech-recognition';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: []
    }
  }

  componentWillMount() {
    speechRecognition.init({
      interimResults: false,
      onSpeech: this.handleSpeech.bind(this)
    });
  }

  handleSpeech(transcriptions) {
    this.setState({
      text: `${this.state.text} ${transcriptions.text[0].text}`
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className='texts'>
          <p contentEditable>
            Geppetto, a poor old wood carver, was making a puppet from a tree branch. "You shall be my little boy," he said to the puppet, "and I shall call you 'Pinocchio'." He worked for hours, carefully carving each detail. When he reached the mouth, the puppet started making faces at Geppetto. "Stop that, you naughty boy," Geppetto scolded, "Stop that at once !" "I won't stop !" cried Pinocchio.
          </p>
          <p>
            {this.state.text}
          </p>
        </div>
        <button onClick={speechRecognition.start}>Start reading</button>
        <button onClick={speechRecognition.stop}>Stop reading</button>
        
      </div>
    );
  }
}

export default App;
