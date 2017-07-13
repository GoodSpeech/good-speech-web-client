import _ from 'lodash';
import React, { Component } from 'react';
import Rainbow from 'rainbowvis.js';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Feedback from '../services/feedback';

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


class TextFeedback extends Component {

  propTypes: {
    textToRead: React.PropTypes.string.isRequired,
    textReaded: React.PropTypes.string.isRequired,
    interimText: React.PropTypes.string.isRequired,
    onEditTextToRead: React.PropTypes.func.isRequired,
    onTextToReadChange: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.redToGreen = new Rainbow();
    this.redToGreen.setSpectrum('red', 'green');
  }

  getInterimTextRange(textReadedFeedback) {
    const start = textReadedFeedback.reduce((charCount, part) => {
      return charCount + part.value.length;
    }, 0);

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
    return textReadedFeedback
      .map((part, index) => {
        if (!_.has(part, 'similarity')) {
          part.similarity = 1
        }
        let color = this.redToGreen.colourAt(part.similarity * 100);
        const style = {
          color: `#${color}`
        };

        return <span key={index} style={style}>{part.value}</span>
      });
  }

  render() {
    const classes = this.props.classes;
    const textReadedFeedback = Feedback.compute(this.props.textToRead, this.props.textReaded);
    const interimTextRange = this.getInterimTextRange(textReadedFeedback);    
    return (
      <p
        contentEditable
        suppressContentEditableWarning
        onFocus={this.props.onEditTextToRead}
        onBlur={el => this.props.onTextToReadChange(el.currentTarget.innerText)}
        className={classes.text}>
        {this.renderTextReadedFeedback(textReadedFeedback)}
        <span className={classes.readed}>
          {this.props.textToRead.slice(interimTextRange.start, interimTextRange.end)}
        </span>
        <span className={classes.unreaded}>{this.props.textToRead.slice(interimTextRange.end)}</span>
      </p>
    );
  }
}

export default withStyles(styleSheet)(TextFeedback);