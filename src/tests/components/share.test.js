import Share from '../../components/share';
import { render } from '../test-utils';

describe('Share component', () => {
  it('Should be rendered as expected', () => {
    const component = render(Share, {title: 'Share this!'});
    expect(component.toJSON()).toMatchSnapshot();  
  });
});