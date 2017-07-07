import React, { Component } from 'react';
import Button from 'material-ui/Button';
import speechRecognition from '../services/speech-recognition';
import '../styles/speech-recognizer.css';

class SpeechRecognizer extends Component {

  readingTimeout: null;

  propTypes: {
    onSpeech: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      reading: false
    }
    this.startReading = this.startReading.bind(this);
    this.stopReading = this.stopReading.bind(this);
  }

  componentWillMount() {
    speechRecognition.init({
      interimResults: true,
      onSpeech: this.handleSpeech.bind(this)
    });
  }

  handleSpeech(transcriptions) {
    clearTimeout(this.readingTimeout);
    this.readingTimeout = setTimeout(this.stopReading, 5000);
    this.props.onSpeech(transcriptions);
  }

  startReading() {
    this.setState({
      reading: true
    });
    speechRecognition.start();
  }

  stopReading() {
    this.setState({
      reading: false
    });
    speechRecognition.stop();
  }

  render() {
    return (
      <div className='speech-recognizer'>
        {this.state.reading ?
          <Button raised color='accent' onClick={this.stopReading}>Stop reading</Button> :
          <Button raised color='primary' onClick={this.startReading}>Start reading</Button>}
      </div>
    );
  }
}

export default SpeechRecognizer;
