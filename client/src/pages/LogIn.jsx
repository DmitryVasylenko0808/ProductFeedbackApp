import React, { useContext } from "react";
import { useNavigate } from "react-router";

import Menu from "../components/Menu.jsx";
import Button from "../components/Button.jsx";
import Form from "../components/Form.jsx";
import Control from "../components/Control.jsx";
import { Link } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
import { signIn } from "../http/usersApi.js";
import { AuthTokenContext } from "../context.js";

const LogIn = () => {
    const { logIn } = useContext(AuthTokenContext);
    const navigate = useNavigate();

    const signInHandle = async (form) => {
        const data = {
            login: form.login.value,
            password: form.password.value
        }

        const result = await signIn(data);
        if (result.success) {
            logIn(result.token);
            navigate("/");
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
            <Form onSubmitHandle={signInHandle} title="Log In">
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
                <div className="form__question">
                    Don't have an account? 
                    <Link to="/registration" className="form__link">
                        Sign Up
                    </Link>
                </div>
                <div className="form__btns">
                    <Link 
                        to="/" 
                        className="form__cancelbtn menu__btn"
                    >
                        Cancel
                    </Link>
                    <Button className="form__addbtn menu__btn">Sign In</Button>
                </div>
            </Form>
        </div>
    )
}

export default LogIn;