import React, { Component } from 'react';
import SpeechSynthesis from '../services/text-to-speech';


class TextSpeak extends Component {
  propTypes: {
    text: React.PropTypes.string.isRequired,
    lang: React.PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
    this.speak = this.speak.bind(this);
    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
  }

  speak(event) {
    const text = this.props.text,
      langCode = this.props.lang.code;

    SpeechSynthesis.speak(text, langCode);
  }

  _onMouseEnter(event) {
    this.setState({
      hover: true
    });
  }

  _onMouseLeave(event) {
    this.setState({
      hover: false
    });
  }

  render() {
    const hoverStyle = this.state.hover ? {boxShadow: 'inset 0 0 2px 2px #ccc'} : {};
    return (
      <span onClick={this.speak}
            className={this.props.className}
            style={hoverStyle}
            onMouseEnter={this._onMouseEnter}
            onMouseLeave={this._onMouseLeave}>
        {this.props.text}
      </span>
    );
  }
}

export default TextSpeak;