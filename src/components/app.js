import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Card, { CardContent, CardActions, CardHeader } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import { withStyles, createStyleSheet } from 'material-ui/styles';

import SpeechRecognizer from './speech-recognizer';
import TextFeedback from './text-feedback';
import Score from './score';
import LanguagePicker from './language-picker';
import Footer from './footer';
import { supportedLanguages, defaultTexts } from '../services/supported-languages';
import Feedback from '../services/feedback';

const styleSheet = createStyleSheet('App', theme => ({
  root: {
    flexGrow: 1,
    alignItems: 'center'
  },
  logo: {
    marginRight: '0.5em',
    verticalAlign: 'bottom'
  },
  grid: {
    justifyContent: 'center',
    minHeight: 'calc(100vh - 195px)'
  },
  card: {
    padding: 5,
    margin: 15,
    textAlign: 'left',
    minWidth: '90%'
  },
  cardActions: {
    padding: 0,
    margin: 0,
    borderBottom: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between'
  },
  interimText: {
    color: theme.palette.text.secondary
  },
  textToReadCard: {
    padding: '0 5px 5px 5px',
    margin: 15,
    textAlign: 'left',
    minWidth: '90%'
  },
  text: {
    minHeight: '2em',
    margin: 0,
    lineHeight: '1.4em',
    border: '1px solid #ccc',
    padding: '1em',
    boxShadow: 'inset 0 0 3px 0px #ddd'
  },
  showTextReadedButton: {
    paddingTop: 13
  }
}));


const defaultLanguage = 'en-US';
const defaultTextToRead = 'The mouse is under the table. The table has a strange color, he said.';
const defaultDisplayTextReadedBox = false;

class App extends React.Component {

  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      textReaded: '',
      interimText: '',
      textReadedFeedback: [],
      textToRead: this.getDefaultTextToRead(),
      lang: this.getDefaultLanguage(),
      displayTextReadedBox: this.getDefaultDisplayTextReadedBox()
    }
    this.handleSpeech = this.handleSpeech.bind(this);
    this.onLanguageChange = this.onLanguageChange.bind(this);
    this.onTextToReadChange = this.onTextToReadChange.bind(this);
    this.onTextReadedChange = this.onTextReadedChange.bind(this);
    this.toggleShowTextReaded = this.toggleShowTextReaded.bind(this);
    this.onInterimTextReadedChange = this.onInterimTextReadedChange.bind(this);
    this.resetSpeech = this.resetSpeech.bind(this);
    this.updateState = this.updateState.bind(this);
    this.onStartTalking = this.onStartTalking.bind(this);
    this.onStopTalking = this.onStopTalking.bind(this);
  }

  updateState(updater) {
    if (_.has(updater, 'textReaded') || _.has(updater, 'textToRead')) {
      const textReaded =  _.has(updater, 'textReaded') ? updater.textReaded : this.state.textReaded;
      const textToRead =  _.has(updater, 'textToRead') ? updater.textToRead : this.state.textToRead;
      let textReadedFeedback = [];
      if (textReaded && textToRead) {
        textReadedFeedback = Feedback.compute(textToRead, textReaded);
      }
      updater.textReadedFeedback = textReadedFeedback;
    }
    this.setState(updater);
  }

  getDefaultLanguage() {
    const code = localStorage.getItem('lang') || defaultLanguage;
    return supportedLanguages.find(lang => lang.code === code);
  }

  getDefaultTextToRead() {
    return localStorage.getItem('textToRead') || defaultTextToRead;
  }

  getDefaultDisplayTextReadedBox() {
    return localStorage.getItem('displayTextReadedBox') === 'true' || defaultDisplayTextReadedBox;
  }

  handleSpeech(transcriptions) {
    const text = transcriptions.text[0].text;

    if (transcriptions.final) {
      this.updateState({
        textReaded: `${this.state.textReaded} ${text.trim()}`,
        interimText: ''
      });
    } else {
      this.updateState({
        interimText: text
      });
    }
  }

  resetSpeech() {
    this.updateState({textReaded: '', interimText: ''});
  }

  onLanguageChange(lang) {
    const langPrefix = lang.code.split('-')[0];
    const textToRead = defaultTexts[langPrefix] || 'Introduce the text you want to read';
    localStorage.setItem('lang', lang.code);
    localStorage.setItem('textToRead', textToRead);
    this.updateState({lang, textToRead, textReaded: '', interimText: ''});
  }

  onTextToReadChange(textToRead) {
    localStorage.setItem('textToRead', textToRead);
    this.updateState({textToRead});
  }

  onTextReadedChange(event) {
    this.updateState({textReaded: event.currentTarget.innerText});
  }

  onInterimTextReadedChange(event) {
    this.updateState({interimText: event.currentTarget.innerText});
  }

  toggleShowTextReaded() {
    localStorage.setItem('displayTextReadedBox', !this.state.displayTextReadedBox);
    this.updateState({displayTextReadedBox: !this.state.displayTextReadedBox});
  }

  onStartTalking() {
    this.updateState({talking: true});
  }

  onStopTalking() {
    this.updateState({talking: false});
  }

  render() {
    const classes = this.props.classes;
    const displayScore = !this.state.talking && this.state.textReadedFeedback.length > 0;
    const displayShareButtons = !displayScore;

    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <Typography type='title' color='inherit'>
              <i className={`material-icons ${classes.logo}`}>record_voice_over</i>
              Good Speech
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container gutter={8} className={classes.grid} >
          <Grid item xs={12} sm={12} lg={6}>
            <Card className={classes.textToReadCard}>
              <CardActions className={classes.cardActions}>
                <Button
                  className={classes.showTextReadedButton}
                  onClick={this.toggleShowTextReaded}>
                  {this.state.displayTextReadedBox ? 'Hide ' : 'Show '}
                  text read
                </Button>
                <LanguagePicker lang={this.state.lang} onChange={this.onLanguageChange} />
              </CardActions>
              <CardContent>
                <TextFeedback
                  textReadedFeedback={this.state.textReadedFeedback}
                  textToRead={this.state.textToRead}
                  textReaded={this.state.textReaded}
                  interimText={this.state.interimText}
                  lang={this.state.lang.code}
                  onTextToReadChange={this.onTextToReadChange}
                  onEditTextToRead={this.resetSpeech} />
              </CardContent>
            </Card>
            <SpeechRecognizer
              onSpeech={this.handleSpeech}
              onReset={this.resetSpeech}
              onStartTalking={this.onStartTalking}
              onStopTalking={this.onStopTalking}
              talking={this.state.talking}
              displayResetButton={!!this.state.textReaded || !!this.state.interimText}
              langCode={this.state.lang.code} />

            {displayScore ?
              <Score textReadedFeedback={this.state.textReadedFeedback}/> : null}
          </Grid>
          {this.state.displayTextReadedBox ?
            (<Grid item xs={12} sm={12} lg={6}>
              <Card className={classes.card}>
                <CardHeader title='Text read'></CardHeader>
                <CardContent>
                  <h5>Final text</h5>
                  <p
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={this.onTextReadedChange}
                    className={classes.text}>
                    {this.state.textReaded}
                  </p>
                  <h5>Interim text</h5>
                  <p
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={this.onInterimTextReadedChange}
                    className={classes.text}>
                    {this.state.interimText}
                  </p>
                </CardContent>
              </Card>
            </Grid>) : null
          }
        </Grid>
        <Footer displayShareButtons={displayShareButtons}/>
      </div>
    );
  }
}

export default withStyles(styleSheet)(App);
