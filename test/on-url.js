import test from 'ava';
import sinon from 'sinon';
import onUrl from '../';

// Location Pollyfill for testing
global.location = {};

test('must be a function', t => {
  t.true({}.toString.call(onUrl) === '[object Function]');
});

test('must execute the callback when the passed url matches', t => {
  const callback = sinon.spy();
  location.href = '/test';
  location.pathname = 'http://exemple.com/test';

  onUrl('/test', callback);
  onUrl('/test', callback, true);
  onUrl('http://exemple.com/test', callback, true);

  t.true(callback.calledTwice);
});

test('must execute the callback if the url is inside the array', t => {
  const callback = sinon.spy();
  location.href = '/test';
  location.pathname = 'http://exemple.com/test';

  onUrl(['/test', '/no-test'], callback);
  onUrl(['/test', '/no-test'], callback, true);
  onUrl(['http://exemple.com/test', 'http://google.com'], callback, true);

  t.true(callback.calledTwice);
});


test('if the url has parameters it should be passed as a parameter to the callback', t => {
  const callback = sinon.spy();
  location.href = '/posts/1';
  location.pathname = 'http://exemple.com/posts/1';

  onUrl('/posts/:id', callback);
  onUrl('/posts/:id', callback, true);
  onUrl('http://exemple.com/posts/:id', callback, true);

  t.true(callback.withArgs('1').calledTwice);
});
