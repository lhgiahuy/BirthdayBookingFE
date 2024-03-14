import axios from 'axios';

const API_ROOT = 'https://65e1a8d6a8583365b316f7df.mockapi.io/api';

const instance = axios.create({
    baseURL: API_ROOT
});
const Agent = {
    getService: () => instance.get('/service')
};

export default Agent;