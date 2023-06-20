import { usersApi } from "./index";

export const registration = async (data) => {
    try {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("surname", data.surname);
        formData.append("login", data.login);
        formData.append("password", data.password);
        formData.append("repeatPassword", data.repeatPassword);
        formData.append("role", "User");
        formData.append("avatar", data.avatarFile);

        const res = await usersApi.post("/register", formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );
        const { success, message } = res.data;
        return { success, message };
    }
    catch (err) {
        const { success, errorMessages } = err.response.data;
        return { success, errorMessages };
    }
}

export const signIn = async (data) => {
    try {
        const formData = new FormData();
        formData.append("login", data.login);
        formData.append("password", data.password);

        const res = await usersApi.post("/signin", data,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );
        const { success, token } = res.data;
        return { success, token };
    }
    catch (err) {
        const { success, errorMessages } = err.response.data;
        return { success, errorMessages };
    }
}

export const fetchMe = async (token) => {
    try {
        const res = await usersApi.get("/me", {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        const data = res.data;
        return data;
    }
    catch (err) {
        const { errorMessage } = err.response.data;
        return errorMessage;
    }
}