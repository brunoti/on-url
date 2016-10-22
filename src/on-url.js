import in_array from 'in_array';
import pathToRegexp from 'path-to-regexp';

/**
 * This function executes an callback if the url parameter matches somehow the
 * current * url from 'location.pathname' or 'location.href' if strict mode
 * is on.
 *
 * @param {String|Array|RegExp} url - The url or pathname that should fire the event
 * @param {Function} callback - The function that will be called if the url
 * matches the url parameter
 * @param {Bool} [strict=true] - If should compare to the pathname or the
 * complete url. The default is true.
 *
 * @return {*} - Return the callback return value
 */
export default function onUrl(url, callback, strict) {
  strict = strict === undefined ? false : strict;
  const path = location[strict ? 'href' : 'pathname'];

  if(Array.isArray(url) && in_array(path, url)) {
    return callback();
  }

  if(url instanceof RegExp && url.test(path)) {
    return callback();
  }

  url = pathToRegexp(url);

  if(url.test(path)) {
    return callback.apply(null, url.exec(path).slice(1));
  }
};
