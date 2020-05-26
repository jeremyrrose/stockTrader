import Api from './apiConfig';

export const register = async (userData) => {
    try {
        const resp = await Api.post('/register', userData);
        console.log(resp);
        return resp;
    } catch (error) {
        throw error
    }
}
