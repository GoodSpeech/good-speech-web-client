import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { withStyles, createStyleSheet } from 'material-ui/styles';

import { i18n } from '../services/i18n';
import speechRecognition from '../services/speech-recognition';

const styleSheet = createStyleSheet('SpeechRecognizer', theme => ({
  center: {
    textAlign: 'center'
  },
  twoColumns: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 2.3em'
  },
  chrome: {
    width: '3em',
    verticalAlign: 'middle',
    marginRight: '1em'
  },
  chromeLegend: {
    paddingTop: '0.3em'
  }
}));

const isChrome = !!(window.chrome && window.chrome.webstore);

class SpeechRecognizer extends React.Component {

  readingTimeout = null;

  static propTypes = {
    onSpeech: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    langCode: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
    onStartTalking: PropTypes.func.isRequired,
    onStopTalking: PropTypes.func.isRequired,
    talking: PropTypes.bool,
    displayResetButton: PropTypes.bool.isRequired,
    speechRecognitionSupported: PropTypes.bool,
    speechRecognition: PropTypes.object
  };

  static defaultProps = {
    speechRecognitionSupported: isChrome,
    speechRecognition: speechRecognition
  }

  constructor(props) {
    super(props);
    this.initSpeechRecognition(props);
    this.startTalking = this.startTalking.bind(this);
    this.stopTalking = this.stopTalking.bind(this);
  }

  initSpeechRecognition(props) {
    props.speechRecognition.init({
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

  openGoogleChrome() {
    window.open('https://www.google.com/chrome/index.html', '_blank').focus();
  }

  handleSpeech(transcriptions) {
    clearTimeout(this.readingTimeout);
    this.readingTimeout = setTimeout(this.stopTalking, 4000);
    this.props.onSpeech(transcriptions);
  }

  startTalking() {
    this.props.onStartTalking();
    this.props.speechRecognition.start();
  }

  stopTalking() {
    this.props.onStopTalking();
    this.props.speechRecognition.stop();
  }

  render() {
    const classes = this.props.classes;

    if (!this.props.speechRecognitionSupported) {
      return (
        <div className={classes.center}>
          <Button raised color='accent' onClick={this.openGoogleChrome}>
            <img alt='Google Chrome' src='/chrome.svg' className={classes.chrome}/>
            <span className={classes.chromeLegend}>{i18n`Speech recognition is only supported by Google Chrome Desktop`}</span>
          </Button>
        </div>
      );
    }

    if (this.props.talking) {
      return (
        <div className={classes.center}>
          <Button raised color='accent' onClick={this.stopTalking}>
            <i className='material-icons'>mic_off</i> {i18n`Stop reading`}
          </Button>
        </div>
      );
    }

    if (this.props.displayResetButton) {
      return (
        <div className={classes.twoColumns}>
          <Button onClick={this.props.onReset}>
            <i className='material-icons'>replay</i> {i18n`Reset`}
          </Button>
          <Button raised color='primary' onClick={this.startTalking}>
            <i className='material-icons'>mic</i> {i18n`Continue reading`}
          </Button>
        </div>
      );
    }

    return (
      <div className={classes.center}>
        <Button raised color='primary' onClick={this.startTalking}>
          <i className='material-icons'>mic</i> {i18n`Start reading`}
        </Button>
      </div>
    );
  }
}

export default withStyles(styleSheet)(SpeechRecognizer);
