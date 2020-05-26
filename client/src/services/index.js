import Api from './apiConfig';
import changeHeader from './apiConfig';

export const register = async (userData) => {
    try {
        const resp = await Api.post('/register', userData);
        if (resp.status == 201) {
            localStorage.setItem('token', resp.data.token);
            changeHeader();
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
            localStorage.setItem('token', resp.data.token);
            changeHeader();
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

