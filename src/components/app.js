import React, { Component } from 'react';
import '../styles/app.css';
import SpeechRecognizer from './speech-recognizer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Card, { CardContent } from 'material-ui/Card';

class App extends Component {

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
    return (
      <div className='App'>
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
        <div className='texts'>
          <Card className='card'>
            <CardContent>
              <p contentEditable suppressContentEditableWarning>
                Geppetto, a poor old wood carver, was making a puppet from a tree branch. 'You shall be my little boy,' he said to the puppet, 'and I shall call you 'Pinocchio'.' He worked for hours, carefully carving each detail. When he reached the mouth, the puppet started making faces at Geppetto. 'Stop that, you naughty boy,' Geppetto scolded, 'Stop that at once !' 'I won't stop !' cried Pinocchio.
              </p>
            </CardContent>
          </Card>
          <Card className='card'>
            <CardContent>
              <p>
                <span>{this.state.text}</span>
                <span className='interimText'>{this.state.interimText}</span>
              </p>
            </CardContent>
          </Card>
        </div>
        <SpeechRecognizer onSpeech={this.handleSpeech} />
      </div>
    );
  }
}

export default App;
