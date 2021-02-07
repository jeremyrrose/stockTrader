import Axios from 'axios';

const Ticker = Axios.create({
  baseURL: 'https://cloud.iexapis.com/stable/stock/'
})

export default Ticker