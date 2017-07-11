import React, { Component } from 'react';
import SpeechRecognizer from './speech-recognizer';
import TextFeedback from './text-feedback';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Card, { CardContent, CardActions, CardHeader } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { supportedLanguages, defaultTexts } from '../services/supported-languages';
import LanguagePicker from './language-picker';

const styleSheet = createStyleSheet('App', theme => ({
  root: {
    flexGrow: 1,
    alignItems: 'center'
  },
  texts: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  card: {
    padding: 5,
    margin: 15,
    textAlign: 'left',
    minWidth: '90%'
  },
  cardActions: {
    padding: 0,
    margin: 0
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
    minHeight: '4em',
    margin: 0,
    lineHeight: '1.4em'
  }
}));


const defaultLanguage = 'en-US';
const defaultTextToRead = 'The mouse is under the table. The table has a strange colour, he said.';


class App extends Component {

  propTypes: {
    classes: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      textReaded: '',
      interimText: '',
      textToRead: this.getDefaultTextToRead(),
      lang: this.getDefaultLanguage()
    }
    this.handleSpeech = this.handleSpeech.bind(this);
    this.onLanguageChange = this.onLanguageChange.bind(this);
    this.onTextToReadChange = this.onTextToReadChange.bind(this);
    this.onTextReadedChange = this.onTextReadedChange.bind(this);
  }

  getDefaultLanguage() {
    const code = localStorage.getItem('lang') || defaultLanguage;
    return supportedLanguages.find(lang => lang.code === code);
  }

  getDefaultTextToRead() {
    return localStorage.getItem('textToRead') || defaultTextToRead;
  }

  handleSpeech(transcriptions) {
    const text = transcriptions.text[0].text;

    if (transcriptions.final) {
      this.setState({
        textReaded: `${this.state.textReaded} ${text}`,
        interimText: ''
      });
    } else {
      this.setState({
        interimText: text
      });
    }
  }

  onLanguageChange(lang) {
    const langPrefix = lang.code.split('-')[0];
    const textToRead = defaultTexts[langPrefix] || 'Introduce the text you want to read';
    localStorage.setItem('lang', lang.code);
    localStorage.setItem('textToRead', textToRead);
    this.setState({lang, textToRead, textReaded: '', interimText: ''});
  }

  onTextToReadChange(event) {
    const textToRead = event.currentTarget.innerText;
    localStorage.setItem('textToRead', textToRead);
    this.setState({textToRead});
  }

  onTextReadedChange(event) {
    this.setState({textReaded: event.currentTarget.innerText});
  }

  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton color='contrast' aria-label='Menu'>
              <MenuIcon />
            </IconButton>
            <Typography type='title' color='inherit'>
              Good Talk
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container gutter={8} >
          <Grid item xs={12} sm={6} className={classes.texts}>
            <Card className={classes.textToReadCard}>
              <CardActions className={classes.cardActions}>
                <LanguagePicker lang={this.state.lang} onChange={this.onLanguageChange} />
              </CardActions>
              <CardContent>
                <p
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={this.onTextToReadChange}
                  className={classes.text}>
                  {this.state.textToRead}
                </p>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.texts}>
            <Card className={classes.card}>
              <CardHeader title='Debugger'></CardHeader>
              <CardContent>
                <p contentEditable
                    suppressContentEditableWarning
                    onBlur={this.onTextReadedChange}
                    className={classes.text}>
                    {this.state.textReaded}
                </p>
                <p><span className={classes.interimText}>{this.state.interimText}</span></p>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {this.state.textToRead.length > 0 && this.state.textReaded.length > 0 ? (
          <Grid container gutter={8} >
            <Grid item sm={3}></Grid> {/* offset */}
            <Grid item xs={12} sm={6} className={classes.texts}>
              <Card className={classes.card}>
                <CardContent>
                  <TextFeedback textToRead={this.state.textToRead} textReaded={this.state.textReaded}></TextFeedback>
                </CardContent>
              </Card>
            </Grid>
          </Grid>) : null }
        <SpeechRecognizer onSpeech={this.handleSpeech} langCode={this.state.lang.code} />
      </div>
    );
  }
}

export default withStyles(styleSheet)(App);
