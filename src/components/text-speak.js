import React, { Component } from 'react';
import SpeechSynthesis from '../services/text-to-speech';
import _ from 'lodash';

class TextSpeak extends Component {
  propTypes: {
    text: React.PropTypes.string.isRequired,
    style: React.PropTypes.object,
    langCode: React.PropTypes.string.isRequired
  };

  defaultProps: {
    style: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      hover: null
    };
    this.speak = this.speak.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
  }

  speak(phrase) {
    SpeechSynthesis.speak(phrase, this.props.lang);
  }

  onMouseEnter(index) {
    this.setState({
      hover: index
    });
  }

  onMouseLeave(event) {
    this.setState({
      hover: null
    });
  }

  onMouseDown(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  getSentences(text) {
    const sentences = [];
    let charIndex = 0;
    while(charIndex < text.length) {
      const updatedCharIndex = _.min(_.without([text.indexOf('.', charIndex), text.indexOf(',', charIndex), text.indexOf(';', charIndex), text.length], -1, 0)) + 1;
      sentences.push(text.slice(charIndex, updatedCharIndex));
      charIndex = updatedCharIndex;
    }
    return sentences;
  }

  render() {
    return (
      <span>{
        this.getSentences(this.props.text).map((phrase, index) => {
          const hoverStyle = this.state.hover === index ? {
            boxShadow: 'inset 0 0 2px 2px #ccc',
            borderRadius: 3,
            cursor: 'pointer'
          } : {};
          return (
            <span
              key={index}
              onClick={() => this.speak(phrase)}
              className={this.props.className}
              style={{...hoverStyle, ...this.props.style}}
              onMouseDown={this.onMouseDown}
              onMouseEnter={() => this.onMouseEnter(index)}
              onMouseLeave={this.onMouseLeave}>
              {phrase}
            </span>
          )
        })
      }</span>
    );
  }
}

export default TextSpeak;