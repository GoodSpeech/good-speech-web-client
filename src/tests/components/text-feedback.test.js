import TextFeedbak from '../../components/text-feedback';
import { render } from '../test-utils';

const defaultProps = {
  textReadedFeedback: [{
    value: 'The',
    similarity: 0.7
  }, {
    value: ' cat is'
  }],
  textToRead: 'The cat is under the table.',
  textReaded: 'The cat is',
  interimText: 'under the',
  lang: 'en-US',
  onEditTextToRead: () => {},
  onTextToReadChange: () => {}
};

describe('TextFeedbak component', () => {
  it('Should display unsupported message', () => {
    const component = render(TextFeedbak, defaultProps);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('Should call onEditTextToRead when focus content editable element', () => {
    const onEditTextToRead = jest.fn();
    const component = render(TextFeedbak, defaultProps, {onEditTextToRead});
    component.toJSON().children[0].props.onFocus();
    expect(onEditTextToRead).toBeCalled();
  });

  it('Should call onTextToReadChange when blur content editable element', () => {
    const onTextToReadChange = jest.fn();
    const component = render(TextFeedbak, defaultProps, {onTextToReadChange});
    component.toJSON().children[0].props.onBlur({
      currentTarget: {
        innerText: 'foo'
      }
    });
    expect(onTextToReadChange).toBeCalledWith('foo');
  });

  it('Should call onTextToReadChange when paste text in content editable element', () => {
    const onTextToReadChange = jest.fn();
    const component = render(TextFeedbak, defaultProps, {onTextToReadChange});
    component.toJSON().children[0].props.onPaste({
      preventDefault: () => {},
      clipboardData: {
        getData: () => 'bar'
      }
    });
    expect(onTextToReadChange).toBeCalledWith('bar');
  });

  it('Should add hover styles when the mouse enter to the content editor', () => {
    const component = render(TextFeedbak, defaultProps);
    component.toJSON().children[0].props.onMouseEnter();
    expect(component.toJSON()).toMatchSnapshot();
    component.toJSON().children[0].props.onMouseLeave();
    expect(component.toJSON()).toMatchSnapshot();
  });

});