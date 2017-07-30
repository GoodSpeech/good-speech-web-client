import React from 'react';
import renderer from 'react-test-renderer';
import { MuiThemeProvider } from 'material-ui/styles';
import ReactDOM from 'react-dom';

export function render(Component, defaultProps = {}, props = {}) {
  const updatedProps = {...defaultProps, ...props};
  return renderer.create(<MuiThemeProvider><Component {...updatedProps}/></MuiThemeProvider>);
}

export function renderInContainer(Component, container, defaultProps = {}, props = {}) {
  const updatedProps = {...defaultProps, ...props};
  return ReactDOM.render(<MuiThemeProvider><Component {...updatedProps} /></MuiThemeProvider>, container);
}