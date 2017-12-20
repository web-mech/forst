import test from 'ava';

import forst from '../src';

test('Can find a basic config file at root of config path', (t) => {
  const config = forst('test');
  t.is(typeof config, 'object');
  t.is(config.foo, 'bar');
  t.pass();
});

test('Paths not found will return the nearest hit path', (t) => {
  const config = forst('test/baz');
  t.is(config.foo, 'bar');
  t.pass();
});

test('Can find a basic config file in nested config path', (t) => {
  const config = forst('foo/bar/baz');
  t.is(config.hello, 'world');
  t.pass();
});

test('Can combine configurations', (t) => {
  const config = forst(['test', 'test/foo']);
  t.is(config.foo, 'bar');
  t.pass();
});

test('Child config properties with the same properties as parent config override', (t) => {
  const config = forst(['test', 'test/bar']);
  t.is(config.foo, 'baz');
  t.pass();
});