import { feedbacksApi } from "./index";

export const fetchAll = async (filter, sort) => {
    try {
        const res = await feedbacksApi.get(`/filter/${filter}/sort/${sort}`);
        const { feedbacks } = res.data;
        return feedbacks;
    }
    catch (err) {
        const { errorMessage } = err.response.data;
        return [];
    }
}

export const fetchOne = async (id) => {
    try {
        const res = await feedbacksApi.get(`/${id}`);
        const { feedback } = res.data;
        return feedback;
    }
    catch (err) {
        const { errorMessage } = err.response.data;
        return { feedback: null, errorMessage };
    }
}

export const postComment = async (id, text, token) => {
    try {
        const res = await feedbacksApi.patch(`/comments/${id}`, { text }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const { success, feedback } = res.data;
        return { success, feedback };
    }
    catch (err) {
        const { status } = err.response;
        const { success, errorMessages } = err.response.data;
        return { success, errorMessages, status };
    }
}

export const upvote = async (id, token) => {
    try {
        const res = await feedbacksApi.patch(`/upvote/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const { success } = res.data;
        return { success };
    }
    catch (err) {
        const { status } = err.response;
        const { success, errorMessages } = err.response.data;
        return { success, errorMessages, status };
    }
}

export const add = async (data, token) => {
    try {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('detail', data.detail);
        formData.append('category', data.category);

        const res = await feedbacksApi.post("/", formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const { success, message } = res.data;
        return { success, message };
    }
    catch (err) {
        const { success, errorMessages } = err.response.data;
        return { success, errorMessages }
    }
}

export const edit = async (id, data, token) => {
    try {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('detail', data.detail);
        formData.append('category', data.category);
        formData.append('status', data.status);

        const res = await feedbacksApi.patch(`/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const { success, message } = res.data;
        return { success, message };
    }
    catch (err) {
        const { success, errorMessages } = err.response.data;
        return { success, errorMessages }
    }
}