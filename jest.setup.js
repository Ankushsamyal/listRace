let consoleErrorSpy;

beforeAll(() => {
  consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation((msg, ...args) => {
    if (
      typeof msg === 'string' &&
      (msg.includes('ReactDOMTestUtils.act') || msg.includes('not wrapped in act(...)'))
    ) {
      return; 
    }

    return consoleErrorSpy.mock.calls.length ? undefined : console.error(msg, ...args);
  });
});

afterAll(() => {
  consoleErrorSpy.mockRestore();
});
