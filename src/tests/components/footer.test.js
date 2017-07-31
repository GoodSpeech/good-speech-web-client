import Footer from '../../components/footer';
import { render } from '../test-utils';

describe('Footer component', () => {
  it('Should render share buttons', () => {
    const component = render(Footer, {displayShareButtons: true});
    expect(component.toJSON()).toMatchSnapshot();  
  });

  it('Should not render share buttons', () => {
    const component = render(Footer, {displayShareButtons: false});
    expect(component.toJSON()).toMatchSnapshot();  
  });

  it('Should open twitter accounts when click over the avatars', () => {
    const component = render(Footer, {displayShareButtons: false});
    const javiAvatar = component.toJSON().children[0].children[0].children[0];
    const santiAvatar = component.toJSON().children[0].children[0].children[1];

    const focus = jest.fn();
    window.open = jest.fn();
    window.open.mockReturnValue({focus});

    javiAvatar.props.onClick();
    expect(window.open).toBeCalledWith('https://twitter.com/javipzv', '_blank');

    santiAvatar.props.onClick();
    expect(window.open).lastCalledWith('https://twitter.com/santiwilly', '_blank');

    expect(focus.mock.calls.length).toBe(2);
  });
});