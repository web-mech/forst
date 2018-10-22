import test from 'ava';

import forst from '../src';

const basePath = './tests/conf';

test('Can find a basic config file at root of config path', async (t) => {
  const config = await forst('test', basePath);
  t.is(typeof config, 'object');
  t.is(config.foo, 'bar');
  t.pass();
});

test('Paths not found will return the nearest hit path', async (t) => {
  const config = await forst('test/baz', basePath);
  t.is(config.foo, 'bar');
  t.pass();
});

test('Can find a basic config file in nested config path', async (t) => {
  const config = await forst('foo/bar/baz', basePath);
  t.is(config.hello, 'world');
  t.pass();
});

test('Can combine configurations', async (t) => {
  const config = await forst(['test', 'test/foo'], basePath);
  t.is(config.foo, 'bar');
  t.pass();
});

test('Child config properties with the same properties as parent config override', async (t) => {
  const config = await forst(['test', 'test/bar'], basePath);
  t.is(config.foo, 'baz');
  t.pass();
});
