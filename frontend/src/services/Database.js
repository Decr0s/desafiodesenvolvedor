import api from '../services/api';

class Database {
    async index() {
        const response = await api.get('/usuario');
        return response;
    }

    async store(data) {
        const response = await api.post('/usuario', data)
        return response;

    }

    async destroy(id) {
        const response = await api.delete('/usuario/' + id)
        return response
    }

    async show(id) {
        const response = await api.get('/usuario/' + id);
        return response;
    }


}

const instance = new Database();

export default instance;