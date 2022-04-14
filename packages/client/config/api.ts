import config from '~/config';

const { apiUrl } = config;

export async function register(body: {
  login: string;
  password: string;
  email: string;
}) {
  return await fetch(`${config.apiUrl}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .then((data) => {
      // console.log(data);
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function login(body: { login: string; password: string }) {
  return await fetch(`${config.apiUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .then((data) => {
      // console.log(data);
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

// Helpers

interface IApiOptions {
  method: 'GET' | 'POST';
  body?: string;
}

async function callApi(endpoint: string, options: IApiOptions) {
  const { body } = options;
  return fetch(`${apiUrl}/${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
    ...options,
  }).then(function (response) {
    return response.json().then(function (response) {
      if (!response.ok) {
        return Promise.reject(response);
      }

      return response;
    });
  });
}
