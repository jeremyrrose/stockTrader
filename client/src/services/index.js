import Api from './apiConfig';
import Ticker from './tickerApiConfig';
import { changeHeader, clearHeader } from './apiConfig';

export const register = async (userData) => {
    try {
        const resp = await Api.post('/register', userData);
        if (resp.status == 201) {
            await clearHeader();
            await localStorage.setItem('token', resp.data.token);
            await changeHeader();
        }
        return resp;
    } catch (error) {
        throw error
    }
}

export const login = async (userData) => {
    try {
        const resp = await Api.post('/login', userData);
        if (resp.status == 200) {
            await clearHeader();
            await localStorage.setItem('token', resp.data.token);
            await changeHeader();
        }
        return resp;
    } catch (error) {
        throw error
    }
}

export const account = async () => {
    try {
        const resp = await Api.get('/account');
        return resp;
    } catch (error) {
        throw error;
    }
}

export const checkStock = async (symbol) => {
    try {
        const endpoint = symbol + '/quote/latestPrice?token=pk_b6c458508f174090a67c5dc9a5ed1408'; // publishable token from IEX
        const resp = await Ticker.get(endpoint);
        return resp;
    } catch (error) {
        throw error;
    }
}

export const compareStock = async (symbol) => {
    try {
        const endpoint = symbol + '/quote/?token=pk_b6c458508f174090a67c5dc9a5ed1408'; // publishable token from IEX
        const resp = await Ticker.get(endpoint);
        const compare = resp.data.change > 0 ? 'up' : 'down';
        const price = Number(resp.data.latestPrice).toFixed(2)
        return {compare: compare, price: price}
    } catch (error) {
        throw error;
    }
}

export const newTransaction = async (data) => {
    try {
        const resp = await Api.post('transactions/new', data);
        return resp;
    } catch (error) {
        throw error;
    }
}

export const portfolio = async () => {
    try {
        // const resp = await Api.post('/portfolio', {user: '5ecc20a308676050d7abdaed'});
        const resp = await Api.get('/portfolio');
        return resp;
    } catch (error) {
        throw error
    }
}

export const transactions = async () => {
    try {
        // const resp = await Api.post('/portfolio', {user: '5ecc20a308676050d7abdaed'});
        const resp = await Api.get('/transactions');
        return resp;
    } catch (error) {
        throw error
    }
}

// spins up the Heroku API for quicker response to user interactions
export const wakeHeroku = async () => {
    try {
        const resp = await Api.get('/');
        return resp;
    } catch (error) {
        throw error
    }
}