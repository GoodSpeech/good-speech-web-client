import React, { Component } from 'react';
import Menu, { MenuItem } from 'material-ui/Menu';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import languages from '../services/supported-languages';
import Button from 'material-ui/Button';
import 'flag-icon-css/css/flag-icon.min.css';

const styleSheet = createStyleSheet('LanguagePicker', theme => ({
  flag: {
    marginRight: '0.5em'
  }
}));

class LanguagePicker extends Component {

  propTypes: {
    classes: React.PropTypes.object.isRequired,
    lang: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      openMenu: false
    }
    this.openLanguageMenu = this.openLanguageMenu.bind(this);
    this.closeLanguageMenu = this.closeLanguageMenu.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  openLanguageMenu(event) {
    this.setState({
      openMenu: true,
      buttonEl: event.currentTarget
    });
  }

  closeLanguageMenu() {
    this.setState({
      openMenu: false
    });
  }

  onChange(lang) {
    this.closeLanguageMenu();
    this.props.onChange(lang);
  }

  getFlag(lang) {
    const countryCode = lang.code.split('-')[1].toLowerCase();
    return <span className={`${this.props.classes.flag} flag-icon flag-icon-${countryCode}`}></span>;
  }

  render() {
    return (
      <span>
        <Button 
          aria-owns='pick-language'
          onClick={this.openLanguageMenu}>
          {this.getFlag(this.props.lang)}
          {this.props.lang.name}
          <i className='material-icons'>keyboard_arrow_down</i>
        </Button>
        <Menu
          id='pick-language'
          open={this.state.openMenu}
          anchorEl={this.state.buttonEl}
          onRequestClose={this.closeLanguageMenu}
        >{languages.map(lang => <MenuItem key={lang.code} onClick={() => this.onChange(lang)}>{lang.name}</MenuItem>)}
        </Menu>
      </span>
    );
  }
}

export default withStyles(styleSheet)(LanguagePicker);
