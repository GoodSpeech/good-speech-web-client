import React from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styleSheet = createStyleSheet('Header', theme => ({
  logo: {
    height: '1em',
    verticalAlign: 'middle',
    marginRight: '0.5em'
  },
}));

class Header extends React.Component {

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
