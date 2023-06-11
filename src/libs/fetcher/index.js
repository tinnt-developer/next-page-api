import { createRequestOptions } from './createRequestOptions';
import { handleDebug, handleError, handleResponse } from './handleResponse';

/**
 * Fetcher.
 * @param url
 * @param options
 * @return {Promise<T>}
 * @example fetcher('/users');
 * @example fetcher('/users', { method: 'post' });
 * @example fetcher({ url: '/users' });
 * @example fetcher.get('/users');
 */
export default function fetcher(url, options) {
  return fetchInstance({ url, ...options });
}

const methods = ['get', 'post', 'put', 'patch', 'delete'];

methods.forEach((method) => {
  fetcher[method] = function (url, options) {
    return fetchInstance({ url, method, ...options });
  };
});

/**
 * Create a fetcher instance.
 * @param {string} baseUrl - The base url for the fetcher instance.
 * @param {object} options - The options for the fetcher instance.
 * @param {string} options.url - The url for the fetcher instance.
 * @param {string} options.method - The method for the fetcher instance.
 * @param {object} options.headers - The headers for the fetcher instance.
 * @param {object} options.body - The body for the fetcher instance.
 * @param {boolean} options.debug - The debug for the fetcher instance.
 * @returns {function} The fetcher instance.
 * @example const fetcher = createFetcherInstance('https://api.example.com');
 * @example fetcher.get('/users');
 * @example fetcher({ url: '/users' });
 * */
export function createFetcherInstance(baseUrl, options) {
  // args: []
  // args: [options]
  // args: [url]
  // args: [url, options]
  function normalize(...args) {
    const [arg1, arg2] = args;

    // args: []
    if (!arg1) return { url: baseUrl, newOptions: {} };

    // args: [options]
    if (typeof arg1 === 'object') return { url: baseUrl, newOptions: arg1 };

    // args: [url]
    if (typeof arg1 === 'string' && !arg2)
      return { url: makeUrl(baseUrl, arg1), newOptions: {} };
  }

  const fn = function (...args) {
    const { url, newOptions } = normalize(...args);

    return fetchInstance(url, { ...options, ...newOptions });
  };

  const methods = ['get', 'post', 'put', 'patch', 'delete'];

  methods.forEach((method) => {
    fn[method] = function (...args) {
      const { url, newOptions } = normalize(...args);

      return fetchInstance(url, { ...options, ...newOptions, method });
    };
  });

  return fn;
}

function makeUrl(baseUrl, url) {
  if (baseUrl.endsWith('/') && url.startsWith('/')) {
    // example: baseUrl: 'https://api.example.com/', url: '/users'
    return `${baseUrl}${url.substring(1)}`;
  }

  if (!baseUrl.endsWith('/') && !url.startsWith('/')) {
    // example: baseUrl: 'https://api.example.com', url: 'users'
    return `${baseUrl}/${url}`;
  }

  // example: baseUrl: 'https://api.example.com', url: '/users'

  return `${baseUrl}${url}`;
}

async function fetchInstance(options) {
  const fetch = await getFetch();
  const requestOptions = createRequestOptions({ ...options, fetch });

  delete requestOptions.fetch;
  delete requestOptions.debug;

  return fetch
    .fetch(requestOptions.url, requestOptions)
    .then((response) => {
      return handleResponse(response, requestOptions);
    })
    .then((response) => {
      if (options.debug) {
        return handleDebug(response, requestOptions);
      }

      return response;
    })
    .catch(handleError);
}

async function getFetch() {
  if (typeof fetch !== 'undefined' && typeof window !== 'undefined') {
    const f = await import('node-fetch');
    return {
      fetch: f.default,
      Headers: f.Headers, // the Headers constructor
    };
  } else {
    return {
      fetch: window.fetch.bind(window),
      Headers: window.Headers,
    };
  }
}
