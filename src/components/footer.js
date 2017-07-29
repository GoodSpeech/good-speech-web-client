import React from 'react';
import Avatar from 'material-ui/Avatar';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Chip from 'material-ui/Chip';

import Share from './share';
import { i18n } from '../services/i18n';


const styleSheet = createStyleSheet('Footer', theme => ({
  chip: {
    margin: '0 0.5em'
  },
  card: {
    background: '#f9f9f9',
    boxShadow: '0 0 5px 1px #ccc'
  },
  cardContent: {
    display: 'flex',
    paddingTop: '0.5em',
    paddingBottom: '0.5em!important',
    justifyContent: 'center'
  }
}));

class Footer extends React.Component {

  openJaviTwiter() {
    window.open('https://twitter.com/javipzv', '_blank').focus();
  }

  openSanTwiter() {
    window.open('https://twitter.com/santiwilly', '_blank').focus();
  }

  render() {
    const classes = this.props.classes;
    return (
      <div>
        {this.props.displayShareButtons ?
          <Share title={i18n`Practice your speech level in any language. good-speech.com`} /> : null}
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Chip
              avatar={
                <Avatar
                  alt='Javier Perez'
                  src='https://www.gravatar.com/avatar/90fd523a31015aaa143278948e4729d1?s=200'
                />
              }
              label='Javier Perez'
              onClick={this.openJaviTwiter}
              className={classes.chip}
            />
            <Chip
              avatar={
                <Avatar
                  alt='Santiago Fraire Willemoës'
                  src='https://www.gravatar.com/avatar/7ff595c207c9b935811a691d2f3d2551?s=200'
                />
              }
              label='Santiago Fraire Willemoës'
              onClick={this.openSanTwiter}
              className={classes.chip}
            />
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styleSheet)(Footer);
