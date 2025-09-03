import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

export const getTeachers = async () => {
    const {data: {data: teachers}} = await api.get('/teachers');
    return teachers;
};

export const addTeacher = async (teacher) => {
    const {data} = await api.post('/teachers', teacher);
    return data;
};
