import Api from './apiConfig';

export const register = async (userData) => {
    try {
        const resp = await Api.post('/register', userData);
        if (resp.status == 201) {
            localStorage.setItem('token', resp.data.token)
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
            localStorage.setItem('token', resp.data.token)
        }
        return resp;
    } catch (error) {
        throw error
    }
}
