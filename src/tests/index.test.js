describe('Index', () => {
  const localStorage = window.localStorage;

  beforeEach(() => {
    window.localStorage = {
      setItem: jest.fn(),
      getItem: jest.fn()
    };
  });

  afterEach(() => {
    window.localStorage = localStorage;
  });

  it('Should render an element', () => {
    const node = document.createElement('div');
    node.setAttribute('id', 'root');
    document.body.appendChild(node);
    expect(document.getElementById('root').innerHTML.length).toBe(0);
    require('../index.js');
    expect(document.getElementById('root').innerHTML.length).toBeGreaterThan(0);
  });
});


