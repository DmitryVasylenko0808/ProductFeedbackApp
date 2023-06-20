import axios from "axios";

const host = "http://localhost:3000/";

export const usersApi = axios.create(
    {
        baseURL: host + "auth"
    }
);

export const feedbacksApi = axios.create(
    {
        baseURL: host + "feedbacks"
    }
);