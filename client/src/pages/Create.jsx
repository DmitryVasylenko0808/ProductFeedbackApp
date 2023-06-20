import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Menu from "../components/Menu.jsx";
import Button from "../components/Button.jsx";
import Form from "../components/Form.jsx";
import Control from "../components/Control.jsx";
import { MdArrowForwardIos } from "react-icons/md";

import { useNavigate } from "react-router";
import { AuthTokenContext } from "../context.js";
import { add } from "../http/feedbacksApi.js";

const Create = () => {
    const options = [
        { value: "Enchancement", title: "Enchancement" },
        { value: "Bug", title: "Bug" },
        { value: "Feature", title: "Feature" },
        { value: "UI", title: "UI" },
        { value: "UX", title: "UX" }
    ];

    const { token } = useContext(AuthTokenContext);
    const navigate = useNavigate();

    const onAddFeedbackHandle = async (form) => {
        const data = {
            title: form.title.value,
            detail: form.detail.value,
            category: form.category.value
        };

        const result = await add(data, token);
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
                    </span> Go Back
                </Button>
            </Menu>
            <Form 
                onSubmitHandle={onAddFeedbackHandle} 
                title="Create New Feedback" 
                imgCircle="create"
            >
                <Control
                    type="input-form"
                    title="Feeback Title"
                    text="Add a short, descriptive headline"
                    name="title"
                />
                <Control
                    type="select-form"
                    title="Category"
                    text="Choose a category for your feedback"
                    options={options}
                    name="category"
                />
                <Control
                    type="textarea-form"
                    title="Feedback Detail"
                    text="Include any specific comments on what should be improved, added, etc."
                    name="detail"
                />
                <div className="form__btns">
                    <Link 
                        to="/" 
                        className="form__cancelbtn menu__btn"
                    >
                        Cancel
                    </Link>
                    <Button className="form__addbtn menu__btn">Add Feedback</Button>
                </div>
            </Form>
        </div>
    )
}

export default Create;