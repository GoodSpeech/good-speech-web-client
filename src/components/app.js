import React, { Component } from 'react';
import SpeechRecognizer from './speech-recognizer';
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


class App extends Component {

  propTypes: {
    classes: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      interimText: ''
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
          <Grid item xs={6} md={4} className={classes.texts}>
            <Card className={classes.card}>
              <CardContent>
                <p>Geppetto, a poor old wood carver, was making a puppet from a tree branch. 'You shall be my little boy,' he said to the puppet, 'and I shall call you 'Pinocchio'.' He worked for hours, carefully carving each detail. When he reached the mouth, the puppet started making faces at Geppetto. 'Stop that, you naughty boy,' Geppetto scolded, 'Stop that at once !' 'I won't stop !' cried Pinocchio.</p>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={4} className={classes.texts}>
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
        <SpeechRecognizer onSpeech={this.handleSpeech} />
      </div>
    );
  }
}

export default withStyles(styleSheet)(App);
