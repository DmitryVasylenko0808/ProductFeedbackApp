import React from "react";
import { useNavigate } from "react-router";

import { Link } from "react-router-dom";
import Menu from "../components/Menu.jsx";
import Button from "../components/Button.jsx";
import Form from "../components/Form.jsx";
import Control from "../components/Control.jsx";
import { MdArrowForwardIos } from "react-icons/md";
import { registration } from "../http/usersApi.js";

const Registration = () => {
    const navigate = useNavigate();

    const signUpHandle = async (form) => {
        const data = {
            name: form.name.value,
            surname: form.surname.value,
            login: form.login.value,
            password: form.password.value,
            repeatPassword: form.repeatPassword.value,
            avatarFile: form.avatar.files[0]
        }

        const result = await registration(data);
        if (result.success) {
            alert(result.message);
        }
        else {
            alert(result.errorMessages[0]);
        }
    }

    const goBack = () => navigate(-1);

    return (
        <div className="_container2">
            <Menu type="menu _inner _form">
                <Button onClick={goBack} className="menu__back">
                    <span className="menu__arrowback">
                        <MdArrowForwardIos size={20} />
                    </span>
                    Go Back
                </Button>
            </Menu>
            <Form onSubmitHandle={signUpHandle} title="Registration">
                <Control
                    type="input-form"
                    title="Name"
                    name="name"
                />
                <Control
                    type="input-form"
                    title="Surname"
                    name="surname"
                />
                <Control
                    type="input-form"
                    title="Login"
                    name="login"
                />
                <Control
                    type="input-form"
                    typeInput="password"
                    title="Password"
                    name="password"
                />
                <Control
                    type="input-form"
                    typeInput="password"
                    title="Repeat password"
                    name="repeatPassword"
                />
                <Control
                    type="input-form"
                    typeInput="file"
                    title="Avatar"
                    name="avatar"
                />
                <div className="form__btns">
                    <Link
                        to="/"
                        className="form__cancelbtn menu__btn"
                    >
                        Cancel
                    </Link>
                    <Button className="form__addbtn menu__btn">Sign Up</Button>
                </div>
            </Form>
        </div>
    )
}

export default Registration;