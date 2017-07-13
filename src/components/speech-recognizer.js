import React, { Component } from 'react';
import Button from 'material-ui/Button';
import speechRecognition from '../services/speech-recognition';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('SpeechRecognizer', theme => ({
  button: {
    textAlign: 'center'
  }
}));

class SpeechRecognizer extends Component {

  readingTimeout: null;

  propTypes: {
    onSpeech: React.PropTypes.func.isRequired,
    classes: React.PropTypes.object.isRequired,
    langCode: React.PropTypes.String.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      reading: false
    }
    this.initSpeechRecognition(props);
    this.startReading = this.startReading.bind(this);
    this.stopReading = this.stopReading.bind(this);
  }

  initSpeechRecognition(props) {
    speechRecognition.init({
      interimResults: true,
      lang: props.langCode,
      onSpeech: this.handleSpeech.bind(this)
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.langCode !== this.props.langCode) {
      this.initSpeechRecognition(nextProps);
    }
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
    const classes = this.props.classes;

    return (
      <div className={classes.button}>
        {this.state.reading ?
          <Button raised color='accent' onClick={this.stopReading}>
            <i className='material-icons'>mic_off</i> Stop reading
          </Button> :
          <Button raised color='primary' onClick={this.startReading}>
            <i className='material-icons'>mic</i> Start reading
          </Button>}
      </div>
    );
  }
}


export default withStyles(styleSheet)(SpeechRecognizer);