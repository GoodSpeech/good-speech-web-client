import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Rainbow from 'rainbowvis.js';


const between = (x, min, max) => {
  return x >= min && x <= max;
}

const RATES = [
  {
    result: 'Bad',
    min: 0,
    max: 0.4
  },
  {
    result: 'Regular',
    min: 0.4,
    max: 0.6
  },
  {
    result: 'Good',
    min: 0.6,
    max: 0.85
  },
  {
    result: 'Excellent',
    min: 0.85,
    max: 1
  }
];

const styleSheet = createStyleSheet('Score', theme => ({
  score: {
    textAlign: 'center'
  },
  scoreResult: {
    fontSize: '4em'
  }
}));


class Score extends React.Component {
  static propTypes = {
    textReadedFeedback: PropTypes.array.isRequired,
    displayScore: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.redToGreen = new Rainbow();
    this.redToGreen.setSpectrum('red', '#ffac0a', '#bbc60c', '#76c60c', '#05b515');
    this.calculateScores = this.calculateScores.bind(this);
    this.getColor = this.getColor.bind(this);
  }

  calculateScores(textReadedFeedback) {
    const score = _.sum(textReadedFeedback.map(phrase => phrase.similarity)) / textReadedFeedback.length;
    const rate = RATES.find((rate, index) => {
      return between(score, rate.min, rate.max);
    }) || {};
    const verboseScore = rate.result;
    return [verboseScore, score];
  }

  getColor(score) {
    score = score || null;
    if (!_.isNumber(score)) {
      return '';
    }
    const color = this.redToGreen.colourAt(score * 100);
    return color;
  }

  render() {
    const classes = this.props.classes;
    const [verboseScore, score] = this.calculateScores(this.props.textReadedFeedback);
    const color = this.getColor(score);
    const style = {
      color: `#${color}`
    };

    if (!this.props.displayScore) {
      return null;
    }

    return (
      <div className={classes.score}>
        <span style={style} className=
          {classes.scoreResult}>{verboseScore}
          {` (${score * 100} %)`}
        </span>
      </div>

    );
  }
}

export default withStyles(styleSheet)(Score);