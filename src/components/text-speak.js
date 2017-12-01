import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import * as SpeechSynthesis from '../services/text-to-speech';

class TextSpeak extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    style: PropTypes.object,
    lang: PropTypes.string.isRequired,
    onHover: PropTypes.func.isRequired,
    speechSynthesis: PropTypes.shape({
      speak: PropTypes.func.isRequired
    })
  };

  static defaultProps = {
    style: {},
    speechSynthesis: SpeechSynthesis
  };

  state = {
    hover: null
  }

  speak = (phrase) => {
    this.props.speechSynthesis.speak(phrase, this.props.lang);
  }

  onMouseEnter = (index, event) => {
    this.setState({
      hover: index
    });
    this.props.onHover(true);
    event.stopPropagation();
    event.preventDefault();
  }

  onMouseLeave = (event) => {
    this.setState({
      hover: null
    });
    this.props.onHover(false);
    event.stopPropagation();
    event.preventDefault();
  }

  onMouseDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
  }

  getSentences = (text) => {
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
              key={`${phrase}${index}`}
              onClick={() => this.speak(phrase)}
              className={this.props.className}
              style={{...hoverStyle, ...this.props.style}}
              onMouseDown={this.onMouseDown}
              onMouseEnter={event => this.onMouseEnter(index, event)}
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
