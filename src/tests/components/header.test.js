import Header from '../../components/header';
import { render } from '../test-utils';

describe('Header component', () => {
  it('Should be rendered as expected', () => {
    const component = render(Header);
    expect(component.toJSON()).toMatchSnapshot();  
  });
});