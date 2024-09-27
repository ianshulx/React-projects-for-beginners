import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
// const TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDdiNGNkMTg1MzgyZjg1N2U3MjQ3MiIsImlzYWRtaW4iOnRydWUsImlhdCI6MTY5NjUxMTAyOCwiZXhwIjoxNjk2NTk3NDI4fQ.kSVkNOrZhcI5--hDjAenzsM18oVVLeBOuaBLQUMp9PQ";
const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
    baseURL:BASE_URL,
});

export const userRequest = axios.create({
    baseURL:BASE_URL,
    header: { token: `Bearer ${TOKEN}` },
});
