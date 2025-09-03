import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

export const getClasses = async () => {
    const {data: {data: classes}} = await api.get('/classes');

    return classes
};

export const addClass = async (newClass) => {
    const {data} = await api.post('/classes', newClass);
    return data;
};
