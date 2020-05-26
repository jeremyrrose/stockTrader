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
