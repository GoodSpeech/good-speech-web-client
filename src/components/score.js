import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Rainbow from 'rainbowvis.js';
import { CirclePie } from 'salad-ui.chart'
import Typography from 'material-ui/Typography';

import Share from './share';
import { i18n } from '../services/i18n';

const RATES = [{
  result: () => i18n`Bad`,
  min: 0,
  max: 39
}, {
  result: () => i18n`Regular`,
  min: 40,
  max: 59
}, {
  result: () => i18n`Good`,
  min: 60,
  max: 84
}, {
  result: () => i18n`Excellent`,
  min: 85,
  max: 99
}, {
  result: () => i18n`Perfect`,
  min: 100,
  max: 100
}];

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
    score: PropTypes.number.isRequired,
    language: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.redToGreen = new Rainbow();
    this.redToGreen.setSpectrum('red', '#ffac0a', '#bbc60c', '#76c60c', '#05b515');
  }
  
  getScoreName(score) {
    return RATES
      .find((rate, index) => score >= rate.min && score <= rate.max)
      .result();
  }

  render() {
    const classes = this.props.classes;
    const scoreName = this.getScoreName(this.props.score);
    const color = this.redToGreen.colourAt(this.props.score);
    const lang = this.props.language.split(' (')[0];
    return (
      <div className={classes.scoreContainer}>
        {this.props.score < 100 ?
          <CirclePie width={140} height={140} strokeWidth={15} percent={this.props.score} strokeColor={`#${color}`} labelColor={`#${color}`}/> :
          <span className={classes.circleContainer}><span className={classes.circle}>100%</span></span>
        }
        <Typography type='headline' className={classes.scoreTitle}>{scoreName}</Typography>
        <Share title={i18n`My ${lang} speech level is ${scoreName} (${this.props.score}%). What's yours?. Practice your speech level in any language.`}/>
      </div>
    );
  }
}

export default withStyles(styleSheet)(Score);
