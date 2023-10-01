import axios from 'axios';
import { authApiEndpoints, host } from "./API";
import { getItem, setItem, removeItem } from "./Helpers";

axios.defaults.baseURL = host;
axios.defaults.headers['Content-Type'] = 'application/json';

axios.interceptors.request.use(
  config => {
    // console.log('request interceptor');
    const url = config.url.split('/');

    if (url[url.length - 1] === 'login' || url[url.length - 1] === 'register') {
      delete config.headers.Authorization; // Do not send Authorization if from Login or Register
    }

    let access_token = getItem('access_token');
    if (access_token) {
      config.headers['Authorization'] = 'Bearer ' + access_token;
    }

    return config;
  },
  error => Promise.reject(error),
);

let is_refreshing = false;

let subscribers = [];

axios.interceptors.response.use(undefined, err => {
  // console.log('response interceptor');
  const { config, response: { status } } = err;
  const originalRequest = config;

  if (status === 401) {

    if (!is_refreshing) {
      is_refreshing = true;

      let instance = axios.create({
        headers: { 'Authorization': 'Bearer ' + getItem('access_token') }
      });

      instance.patch(host + authApiEndpoints.refresh)
        .then(response => {
          is_refreshing = false;
          onRefreshed(response.data.access_token);

          // console.log('token refreshed');
          setItem('expires_in', response.data.expires_in);
          setItem('access_token', response.data.access_token);
          setItem('token_created', response.data.token_created);

          subscribers = [];
        })
        .catch(error => {
          console.log(error.response.status);
          // Returning false in my case
          // return false
          if (error.response.status === 401) {
            logout();
          }
        });
    }

    const axiosSubscribers = new Promise(resolve => {
      subscribeTokenRefresh(token => {
        originalRequest.headers.Authorization = 'Bearer ' + token;
        resolve(axios(originalRequest));
      });
    });

    return axiosSubscribers;
  }
  return Promise.reject(err);
});

function subscribeTokenRefresh(cb) {
  subscribers.push(cb);
}

function onRefreshed(token) {
  subscribers.map(cb => cb(token));
}

// Logout a user
export const logout = () => {
  axios.post(authApiEndpoints.logout)
    .then(response => {
      // Check if success
      removeItem('user');
      removeItem('token_created');
      removeItem('access_token');
      removeItem('expires_in');
      window.location.reload();

      return true;
    })
    .catch(error => {
      // Check if token expired
      // Check any other error, like - invalid token
      // Or forcefully logout the user
      removeItem('user');
      removeItem('token_created');
      removeItem('access_token');
      removeItem('expires_in');
      window.location.reload();
      return true; // Return false if you need
    })
};

export default axios;
