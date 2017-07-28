import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Rainbow from 'rainbowvis.js';
import { CirclePie } from 'salad-ui.chart'
import Typography from 'material-ui/Typography';
import Share from './share';

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
  scoreContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '2em 1em 0 1em'
  },
  scoreTitle: {
    marginTop: '0.5em'
  },
  circleContainer: {
    width: 140,
    height: 140,
    background: '#05b515',
    borderRadius: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    width: 110,
    height: 110,
    lineHeight: '110px',
    display: 'block',
    background: 'white',
    borderRadius: '100%',
    verticalAlign: 'middle',
    fontSize: '1.2em',
    color: '#05b515',
    fontWeight: 'bold',
    textAlign: 'center'
  }
}));


class Score extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    textReadedFeedback: PropTypes.array.isRequired,
    language: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.redToGreen = new Rainbow();
    this.redToGreen.setSpectrum('red', '#ffac0a', '#bbc60c', '#76c60c', '#05b515');
    this.calculateScores = this.calculateScores.bind(this);
    this.getColor = this.getColor.bind(this);
  }

  calculateScores(textReadedFeedback) {
    textReadedFeedback = textReadedFeedback.filter(phrase => phrase.value !== ' ');
    let score = 0;
    if (textReadedFeedback.length > 0) {
      const phrasesSimilarity = _.sum(textReadedFeedback.map(phrase => phrase.similarity));
      score = phrasesSimilarity / textReadedFeedback.length;
    }
    const rate = RATES.find((rate, index) => between(score, rate.min, rate.max)) || {};
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
    let [verboseScore, score] = this.calculateScores(this.props.textReadedFeedback);
    const color = this.getColor(score);
    const lang = this.props.language.split(' (')[0];
    score = Math.floor(score * 100);
    return (
      <div className={classes.scoreContainer}>
        {score < 100 ?
          <CirclePie width={140} height={140} strokeWidth={15} percent={score} strokeColor={`#${color}`} labelColor={`#${color}`}/> :
          <span className={classes.circleContainer}><span className={classes.circle}>100%</span></span>
        }        
        <Typography type='headline' className={classes.scoreTitle}>{verboseScore}</Typography>
        <Share title={`My ${lang} speech level is ${verboseScore} (${score}%). What's yours?. Practice your speech level in any language.`}/>
      </div>
    );
  }
}

export default withStyles(styleSheet)(Score);
