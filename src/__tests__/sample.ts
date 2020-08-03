test('passing test', () => {
  console.log('passes!');
});

test('failing test', () => {
  throw new Error('fails!');
});

test('expect example', () => {
  expect(5).toEqual(6); // fails
});
