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
    this.state = {
      feedback: []
    };
    this.compareStrings = this.compareStrings.bind(this);
    this.redToGreen = new Rainbow();
    this.redToGreen.setSpectrum('red', 'green');
    // this.redToGreen.setNumberRange(0, 1);
  }

  componentWillReceiveProps(nextProps) {
    let textReaded = nextProps.textReaded;

    if (textReaded.length > 0) {
      this.compareStrings(textReaded);
    }
  }

  compareStrings(textReaded) {
    const textToRead = this.props.textToRead;
    let feedback = Feedback.compute(textToRead, textReaded);

    this.setState({
      feedback: feedback
    })
  }

  render() {
    return (
      <p>
        {this.state.feedback.map((part, index) => {
          let style = {};
          if (!_.has(part, 'similarity')) {
            part.similarity = 1
          }
          let color = this.redToGreen.colourAt(part.similarity * 100);
            style['color'] = `#${color}`;

          return <span key={index} style={style}>{part.value}</span>
        })}
      </p>
    );
  }
}

export default withStyles(styleSheet)(TextFeedback);