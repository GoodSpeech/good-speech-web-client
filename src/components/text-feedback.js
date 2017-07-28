import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Rainbow from 'rainbowvis.js';
import { withStyles, createStyleSheet } from 'material-ui/styles';

import TextSpeak from './text-speak';


const styleSheet = createStyleSheet('TextFeedback', theme => ({
  readed: {
    color: '#000'
  },
  unreaded: {
    color: '#777'
  },
  text: {
    minHeight: '4em',
    margin: 0,
    lineHeight: '1.4em',
    border: '1px solid #ccc',
    padding: '1em',
    boxShadow: 'inset 0 0 3px 0px #ddd'
  }
}));


class TextFeedback extends React.Component {

  static propTypes = {
    textReadedFeedback: PropTypes.array.isRequired,
    textToRead: PropTypes.string.isRequired,
    textReaded: PropTypes.string.isRequired,
    interimText: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
    onEditTextToRead: PropTypes.func.isRequired,
    onTextToReadChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.redToGreen = new Rainbow();
    this.redToGreen.setSpectrum('red', 'orange', 'green');
    this.onBlur = this.onBlur.bind(this);
    this.onPaste = this.onPaste.bind(this);
  }

  getInterimTextRange(textReadedFeedback) {
    const start = textReadedFeedback.map(item => item.value).join('').length;

    let interimTextEnd = start;
    if (this.props.interimText) {
      interimTextEnd = this.props.textToRead.indexOf(' ', start + this.props.interimText.length);
    }
    return {
      start,
      end: interimTextEnd
    };
  }

  renderTextReadedFeedback(textReadedFeedback) {
    const lang = this.props.lang;
    return textReadedFeedback
      .map((part, index) => {
        if (!_.has(part, 'similarity')) {
          part.similarity = 1
        }
        let color = this.redToGreen.colourAt(part.similarity * 100);
        const style = {
          color: `#${color}`
        };

        return <TextSpeak key={`${part.value}${index}`} style={style} text={part.value} lang={lang}/>
      });
  }

  onBlur(event) {
    this.props.onTextToReadChange(event.currentTarget.innerText)
  }

  onPaste(event) {
    event.preventDefault();
    this.props.onTextToReadChange(event.clipboardData.getData('text/plain'))
  }

  render() {
    const classes = this.props.classes;
    const textReadedFeedback = this.props.textReadedFeedback;
    const interimTextRange = this.getInterimTextRange(textReadedFeedback);

    return (
      <p
        contentEditable
        suppressContentEditableWarning
        onFocus={this.props.onEditTextToRead}
        onPaste={this.onPaste}
        onBlur={this.onBlur}
        className={classes.text}>
        {this.renderTextReadedFeedback(textReadedFeedback)}
        <TextSpeak className={classes.readed}
                   text={this.props.textToRead.slice(interimTextRange.start, interimTextRange.end)}
                   lang={this.props.lang}/>
        <TextSpeak className={classes.unreaded}
                   text={this.props.textToRead.slice(interimTextRange.end)}
                   lang={this.props.lang}/>
      </p>
    );
  }
}

export default withStyles(styleSheet)(TextFeedback);