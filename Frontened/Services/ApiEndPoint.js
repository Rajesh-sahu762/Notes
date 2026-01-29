import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/', 
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const get=(URL,param) => instance.get(URL, { params: param });
export const post = (URL, data) => instance.post(URL, data);
export const put = (URL, data) => instance.put(URL, data);
export const del = (URL) => instance.delete(URL);
