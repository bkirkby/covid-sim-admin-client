import axios from 'axios';

export const login = (username, password) => {
  return axios.post(`${process.env.REACT_APP_SERVER_API}/login`, { username, password })
    .then(res => {
      localStorage.setItem('token', res.data.key);
      return res;
    })
    .catch(err => {
      if (err.response) {
        return Promise.reject(`login failed: ${err.response.data.error}`);
      } else {
        return Promise.reject(err.message);
      }
    })
};

export const getGraphData = async ({ isolation, social_distance, population }) => {
  const ax = axios.create({
    headers: {
      Authorization: localStorage.getItem('token')
    }
  });

  return ax.post(`${process.env.REACT_APP_SERVER_API}/getGraph`, { isolation, social_distance, population })
    .then(res => {
      console.log('bk: api/index.js: getGraphData: res: ', res)
      return res.data;
    })
    .catch(err => console.error('unable to get graph data: ', err));
}

export const searchGraphListByPopulation = async (isolation, social_distance, population) => {
  const ax = axios.create({
    headers: {
      Authorization: localStorage.getItem('token')
    }
  });

  return ax.get(`${process.env.REACT_APP_SERVER_API}/searchGraphListByPopulation?isolation=${isolation}&social_distance=${social_distance}&population=${population}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      if (err.response) {
        return Promise.reject(`error searching graph list by population(${err.response.status}): ${err.response.data.error}`);
      }
      return Promise.reject(err);
    });
}

export const getGraphList = async () => {
  const ax = axios.create({
    headers: {
      Authorization: localStorage.getItem('token')
    }
  });

  return ax.get(`${process.env.REACT_APP_SERVER_API}/getGraphList`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      if (err.response) {
        return Promise.reject(`error getting graph list(${err.response.status}): ${err.response.data.error}`);
      }
      return Promise.reject(err);
    })
}