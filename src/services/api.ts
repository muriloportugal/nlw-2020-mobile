import axios from 'axios';


const api = axios.create({
  baseURL: 'https://nwl-2020-server.herokuapp.com/',
});

export default api;