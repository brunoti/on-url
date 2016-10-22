import test from 'ava';
import sinon from 'sinon';
import onUrl from '../';

// Location Pollyfill for testing
global.location = {};

const infoTimesCalled = times => `The callback was called ${times} times.`;
const setUrls = (pathname, href) => {
  location.pathname = pathname;
  location.href = href;
}

test('must be a function', t => {
  t.true({}.toString.call(onUrl) === '[object Function]');
});

test('must execute the callback when the passed url matches', t => {
  const callback = sinon.spy();
  setUrls('/test', 'http://exemple.com/test');

  onUrl('/test', callback);
  onUrl('/test', callback, true);
  onUrl('http://exemple.com/test', callback, true);

  t.true(callback.calledTwice, infoTimesCalled(callback.returnValues.length));
});

test('must execute the callback if the url is inside the array', t => {
  const callback = sinon.spy();
  setUrls('/test', 'http://exemple.com/test');

  onUrl(['/test', '/no-test'], callback);
  onUrl(['/test', '/no-test'], callback, true);
  onUrl(['http://exemple.com/test', 'http://google.com'], callback, true);

  t.true(callback.calledTwice, infoTimesCalled(callback.returnValues.length));
});

test('must execute the callback if the url matches a passed regex', t => {
  const callback = sinon.spy();
  const regex = /\S+/;
  setUrls('/test', 'http://exemple.com/test');

  onUrl(regex, callback);
  onUrl(regex, callback, true);

  t.true(callback.calledTwice, infoTimesCalled(callback.returnValues.length));
});


test('if the url has parameters it should be passed as a parameter to the callback', t => {
  const callback = sinon.spy();
  setUrls('/posts/1', 'http://exemple.com/posts/1');

  onUrl('/posts/:id', callback);
  onUrl('/posts/:id', callback, true);
  onUrl('http://exemple.com/posts/:id', callback, true);

  t.true(
    callback.withArgs('1').calledTwice,
    infoTimesCalled(callback.withArgs('1').returnValues.length)
  );
});
