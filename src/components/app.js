import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Card, { CardContent, CardActions, CardHeader } from 'material-ui/Card';
import { withStyles, createStyleSheet } from 'material-ui/styles';

import Header from './header';
import SpeechRecognizer from './speech-recognizer';
import TextFeedback from './text-feedback';
import Score from './score';
import LanguagePicker from './language-picker';
import Footer from './footer';
import { i18n } from '../services/i18n';

const styleSheet = createStyleSheet('App', theme => ({
  root: {
    flexGrow: 1,
    alignItems: 'center'
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

class App extends React.Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    textReaded: PropTypes.string.isRequired,
    interimText: PropTypes.string.isRequired,
    textToRead: PropTypes.string.isRequired,
    talking: PropTypes.bool.isRequired,
    score: PropTypes.number.isRequired,
    textReadedFeedback: PropTypes.array.isRequired,
    lang: PropTypes.object.isRequired,
    displayTextReadedBox: PropTypes.bool.isRequired,
    onUpdateTextToRead: PropTypes.func.isRequired,
    onUpdateTextReaded: PropTypes.func.isRequired,
    onUpdateInterimText: PropTypes.func.isRequired,
    onUpdateLang: PropTypes.func.isRequired,
    toggleDisplayTextReadedBox: PropTypes.func.isRequired,
    onUpdateTalking: PropTypes.func.isRequired
  }

  handleSpeech = (transcriptions) => {
    const text = transcriptions.text[0].text;

    if (transcriptions.final) {
      this.props.onUpdateTextReaded(`${this.props.textReaded} ${text.trim()}`);
      this.props.onUpdateInterimText('');
    } else {
      this.props.onUpdateInterimText(text);
    }
  }

  resetSpeech = () => {
    this.props.onUpdateTextReaded('');
    this.props.onUpdateInterimText('');
  }

  onTextReadedChange = (event) => {
    this.props.onUpdateTextReaded(event.currentTarget.innerText);
  }

  onInterimTextReadedChange = (event) => {
    this.props.onUpdateInterimText(event.currentTarget.innerText);
  }

  onStartTalking = () => {
    this.props.onUpdateTalking(true);
  }

  onStopTalking = () => {
    this.props.onUpdateTalking(false);
  }

  render() {
    const classes = this.props.classes;
    const displayScore = !this.props.talking && this.props.textReadedFeedback.length > 0;
    const displayShareButtons = !displayScore;

    return (
      <div className={classes.root}>
        <Header/>
        <Grid container gutter={8} className={classes.grid} >
          <Grid item xs={12} sm={12} lg={6}>
            <Card className={classes.textToReadCard}>
              <CardActions className={classes.cardActions}>
                <Button
                  className={classes.showTextReadedButton}
                  onClick={this.props.toggleDisplayTextReadedBox}>
                  {this.props.displayTextReadedBox ?
                    i18n`Hide text read` : i18n`Show text read`}
                </Button>
                <LanguagePicker lang={this.props.lang} onChange={this.props.onUpdateLang} />
              </CardActions>
              <CardContent>
                <TextFeedback
                  key={this.props.textToRead}
                  textReadedFeedback={this.props.textReadedFeedback}
                  textToRead={this.props.textToRead}
                  textReaded={this.props.textReaded}
                  interimText={this.props.interimText}
                  lang={this.props.lang.code}
                  onTextToReadChange={this.props.onUpdateTextToRead}
                  onEditTextToRead={this.resetSpeech} />
              </CardContent>
            </Card>
            <SpeechRecognizer
              onSpeech={this.handleSpeech}
              onReset={this.resetSpeech}
              onStartTalking={this.onStartTalking}
              onStopTalking={this.onStopTalking}
              talking={this.props.talking}
              displayResetButton={!!this.props.textReaded || !!this.props.interimText}
              langCode={this.props.lang.code} />

            {displayScore ?
              <Score
                score={this.props.score}
                language={this.props.lang.englishName}/> : null}
          </Grid>
          {this.props.displayTextReadedBox ?
            (<Grid item xs={12} sm={12} lg={6}>
              <Card className={classes.card}>
                <CardHeader title={i18n`Text read`}></CardHeader>
                <CardContent>
                  <h5>{ i18n`Final text` }</h5>
                  <p
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={this.onTextReadedChange}
                    className={classes.text}>
                    {this.props.textReaded}
                  </p>
                  <h5>{ i18n`Interim text` }</h5>
                  <p
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={this.onInterimTextReadedChange}
                    className={classes.text}>
                    {this.props.interimText}
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
