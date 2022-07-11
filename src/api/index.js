const axios = require('axios').default;
const qs = require('qs');

export const apis = {
  fetchUsers: async (queryParams) => {
    return axios.get('http://localhost:4000/users', {
      params: queryParams,
      paramsSerializer: params => qs.stringify(params)
    })
  }
}