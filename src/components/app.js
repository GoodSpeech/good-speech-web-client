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
import languages from '../services/supported-languages';
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
  interimText: {
    color: theme.palette.text.secondary
  },
  text: {
    height: '4em',
    margin: '-1em 0 0 0',
  }
}));


const textToRead = "The mouse is under the table. The table has a strange colour, he said.";


class App extends Component {

  propTypes: {
    classes: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      textReaded: '',
      interimText: '',
      textToRead: textToRead,
      lang: languages.find(lang => lang.code === 'en-US')
    }
    this.handleSpeech = this.handleSpeech.bind(this);
    this.onLanguageChange = this.onLanguageChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
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
    this.setState({
      lang,
      textToRead: 'Introduce the text you want to read',
      textReaded: '',
      interimText: ''
    });
  }

  onTextChange(event, fieldName) {
    this.setState({
      [fieldName]: event.currentTarget.innerText
    });
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
            <Card className={classes.card}>
              <CardActions>
                <LanguagePicker lang={this.state.lang} onChange={this.onLanguageChange} />
              </CardActions>
              <CardContent>
                <p
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => this.onTextChange(e, 'textToRead')}
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
                    onBlur={(e) => this.onTextChange(e, 'textReaded')}
                    className={classes.text}>
                    {this.state.textReaded}
                </p>
                <p><span className={classes.interimText}>{this.state.interimText}</span></p>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container gutter={8} >
          <Grid item sm={3}></Grid> {/* offset */}
          <Grid item xs={12} sm={6} className={classes.texts}>
            <Card className={classes.card}>
              <CardContent>
                <TextFeedback textToRead={this.state.textToRead} textReaded={this.state.textReaded}></TextFeedback>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <SpeechRecognizer onSpeech={this.handleSpeech} langCode={this.state.lang.code} />
      </div>
    );
  }
}

export default withStyles(styleSheet)(App);
