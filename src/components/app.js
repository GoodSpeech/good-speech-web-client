import React, { Component } from 'react';
import SpeechRecognizer from './speech-recognizer';
import TextFeedback from './text-feedback';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import { withStyles, createStyleSheet } from 'material-ui/styles';


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
  }
}));



const textToRead = "The cat is under the table. The table has a strange colour, he said.";


class App extends Component {

  propTypes: {
    classes: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      interimText: '',
      textToRead: textToRead
    }
    this.handleSpeech = this.handleSpeech.bind(this);
  }

  handleSpeech(transcriptions) {
    const text = transcriptions.text[0].text;

    if (transcriptions.final) {
      this.setState({
        text: `${this.state.text} ${text}`,
        interimText: ''
      });
    } else {
      this.setState({
        interimText: text
      });
    }
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
              <CardContent>
                <p contentEditable suppressContentEditableWarning>
                {this.state.textToRead}
              </p>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.texts}>
            <Card className={classes.card}>
              <CardContent>
                <p>
                  <span>{this.state.text}</span>
                  <span className={classes.interimText}>{this.state.interimText}</span>
                </p>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container gutter={8} >
          <Grid item sm={3}></Grid> {/* offset */}
          <Grid item xs={12} sm={6} className={classes.texts}>
            <Card className={classes.card}>
              <CardContent>
                <TextFeedback textToRead={this.state.textToRead} textReaded={this.state.text}></TextFeedback>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <SpeechRecognizer onSpeech={this.handleSpeech} />
      </div>
    );
  }
}

export default withStyles(styleSheet)(App);
