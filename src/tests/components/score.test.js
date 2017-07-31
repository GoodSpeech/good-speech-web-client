import Score from '../../components/score';
import { render } from '../test-utils';

const defaultProps = {
  language: 'Spanish (Argentina)',
  score: 0
}

describe('Score component', () => {
  it('Should render share buttons', () => {
    const component = render(Score, defaultProps);
    expect(component.toJSON()).toMatchSnapshot();  
  });

  it('Should render bad score', () => {
    const component = render(Score, defaultProps, {score: 0});
    expect(component.toJSON()).toMatchSnapshot();  
  });

  it('Should render regular score', () => {
    const component = render(Score, defaultProps, {score: 50});
    expect(component.toJSON()).toMatchSnapshot();  
  });

  it('Should render good score', () => {
    const component = render(Score, defaultProps, {score: 70});
    expect(component.toJSON()).toMatchSnapshot();  
  });

  it('Should render excellent score', () => {
    const component = render(Score, defaultProps, {score: 90});
    expect(component.toJSON()).toMatchSnapshot();  
  });

  it('Should render perfect score', () => {
    const component = render(Score, defaultProps, {score: 100});
    expect(component.toJSON()).toMatchSnapshot();  
  });
});