import React, { Component } from 'react';
import '../styles/app.css';
import SpeechRecognizer from './speech-recognizer';
import TextFeedback from './text-feedback';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Card, { CardContent } from 'material-ui/Card';


const textToRead = "The cat is under the table. The table has a strange colour, he said.";


class App extends Component {

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
                {this.state.textToRead}
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
        <div className='texts'>
          <Card className='card'>
            <CardContent>
              <TextFeedback textToRead={this.state.textToRead} textReaded={this.state.text}></TextFeedback>
            </CardContent>
          </Card>
        </div>
        <SpeechRecognizer onSpeech={this.handleSpeech} />
      </div>
    );
  }
}

export default App;
