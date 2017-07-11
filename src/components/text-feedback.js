import _ from 'lodash';
import React, { Component } from 'react';
import Rainbow from 'rainbowvis.js';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Feedback from '../services/feedback';


const styleSheet = createStyleSheet('TextFeedback', theme => ({
  added: {
    color: 'green'
  },
  removed: {
      color: 'red'
  }
}));


class TextFeedback extends Component {

  propTypes: {
    textToRead: React.PropTypes.string.isRequired,
    textReaded: React.PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.redToGreen = new Rainbow();
    this.redToGreen.setSpectrum('red', 'green');
  }

  render() {
    const feedback = Feedback.compute(this.props.textToRead, this.props.textReaded);

    return (
      <p>
        {feedback.map((part, index) => {
          if (!_.has(part, 'similarity')) {
            part.similarity = 1
          }
          let color = this.redToGreen.colourAt(part.similarity * 100);
          const style = {
            color: `#${color}`
          };

          return <span key={index} style={style}>{part.value}</span>
        })}
      </p>
    );
  }
}

export default withStyles(styleSheet)(TextFeedback);