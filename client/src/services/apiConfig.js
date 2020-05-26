import Axios from 'axios';

export const JwtToken = () => localStorage.getItem('token') || null;

const apiUrl = window.location.hostname === 'localhost' ?
  'http://localhost:3000' :
  'https://stock-trader-jr.herokuapp.com/';

const Api = Axios.create({
  baseURL: apiUrl,
  headers: {
		Authorization: `Bearer ${JwtToken()}`,
    'Access-Control-Allow-Origin': '*'
  }
})

export const changeHeader = () => {
  console.log(JwtToken());
  Api.defaults.headers['Authorization'] = `Bearer ${JwtToken()}`;
  console.log(Api.defaults.headers)
}

export default Api