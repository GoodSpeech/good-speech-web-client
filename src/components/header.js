import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { withStyles, createStyleSheet } from 'material-ui/styles';


const styleSheet = createStyleSheet('Header', theme => ({
  logo: {
    height: '1em',
    verticalAlign: 'middle',
    marginRight: '0.5em'
  },
}));

class Header extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  render() {
    const classes = this.props.classes;
    return (
      <AppBar position='static'>
        <Toolbar>
          <Typography type='title' color='inherit'>
            <img src='/icon.svg' alt='good speech icon' className={classes.logo}/>
            Good Speech
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styleSheet)(Header);
