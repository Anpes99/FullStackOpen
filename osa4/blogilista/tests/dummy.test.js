const { dummy } = require('../utils/list_helper');

const lista = [1, 2, 3, 4, 5, 6, 7];

test('dummy test', () => {
  const result = dummy(lista);

  expect(result).toBe(1);
});
