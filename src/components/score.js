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
    textReadedFeedback: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      verboseScore: '',
      score: null,
      color: ''
    };
    this.redToGreen = new Rainbow();
    this.redToGreen.setSpectrum('red', '#ffac0a', '#bbc60c', '#76c60c', '#05b515');
    this.calculateScores = this.calculateScores.bind(this);
    this.setColor = this.setColor.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const [verboseScore, score] = this.calculateScores(nextProps.textReadedFeedback);
    const color = this.setColor(score);
    this.setState({verboseScore, score, color});
  }

  calculateScores(textReadedFeedback) {
    const score = _.sum(textReadedFeedback.map(phrase => phrase.similarity)) / textReadedFeedback.length;

    const verboseScore = RATES.reduce((result, rate)=>{
      if (between(score, rate.min, rate.max)) {
        return rate.result;
      }
      return result;
    }, '');
    return [verboseScore, score];
  }

  setColor(score) {
    score = score || null;
    if (!_.isNumber(score)) {
      return '';
    }
    const color = this.redToGreen.colourAt(score * 100);
    return color;
  }

  render() {
    const classes = this.props.classes;
    // const color = this.redToGreen.colourAt(this.state.score * 100);
    const style = {
      color: `#${this.state.color}`
    };

    return (
      <div className={classes.score}>
        <span style={style} className={classes.scoreResult}>{this.state.verboseScore}</span>
      </div>

    );
  }
}

export default withStyles(styleSheet)(Score);