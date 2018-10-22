import test from 'ava';

import forstMap from '../src/map';

const basePath = './tests/conf';

test('Returns a config map with objects corresponding to config specifications.', (t) => {
  const config = forstMap({
    'foo': 'test',
    'superFoo': ['test', 'test/bar'],
    'amazingFoo': ['test', 'test/bar', 'foo/bar/baz']
  }, basePath);

  t.is(typeof config.foo, 'object');
  t.is(typeof config.superFoo, 'object');
  t.is(typeof config.amazingFoo, 'object');

  t.is(config.foo.foo, 'bar');
  t.is(config.superFoo.foo, 'baz');
  t.is(config.amazingFoo.foo, 'baz');
  t.is(config.amazingFoo.hello, 'world');
  
  t.pass();
});