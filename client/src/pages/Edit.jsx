import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { Link } from "react-router-dom";
import Menu from "../components/Menu.jsx";
import Button from "../components/Button.jsx";
import Form from "../components/Form.jsx";
import Control from "../components/Control.jsx";
import { MdArrowForwardIos } from "react-icons/md";
import { edit, fetchOne } from "../http/feedbacksApi.js";
import { AuthTokenContext, UserContext } from "../context.js";

const Edit = () => {
    const categoryOptions = [
        { value: "Enchancement", title: "Enchancement" },
        { value: "Bug", title: "Bug" },
        { value: "Feature", title: "Feature" },
        { value: "UI", title: "UI" },
        { value: "UX", title: "UX" }
    ];
    const statusOptions = [
        { value: "Planned", title: "Planned" },
        { value: "In-Progress", title: "In-Progress" },
        { value: "Live", title: "Live" }
    ];

    const [feedback, setFeedback] = useState({});
    const { token } = useContext(AuthTokenContext);
    const params = useParams();
    const navigate = useNavigate();

    const onEditFeedbackHandle = async (form) => {
        const data = {
            title: form.title.value,
            detail: form.detail.value,
            category: form.category.value,
            status: form.status.value
        };

        const result = await edit(feedback._id, data, token);
        if (result.success) {
            alert(result.message);
        }
        else {
            alert(result.errorMessages[0]);
        }
    }

    useEffect(() => {
        const getOneFeedback = async (id) => {
            const data = await fetchOne(id);
            setFeedback(data);
        }
        
        getOneFeedback(params.id);
    }, []);

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
            <Form 
                onSubmitHandle={onEditFeedbackHandle} 
                title={`Editing '${feedback.title}'` }
                imgCircle="edit"
            >
                <Control
                    type="input-form"
                    title="Feeback Title"
                    text="Add a short, descriptive headline"
                    value={feedback.title}
                    name="title"
                />
                <Control
                    type="select-form"
                    title="Category"
                    text="Choose a category for your feedback"
                    options={categoryOptions}
                    value={feedback.category}
                    name="category"
                />
                <Control
                    type="select-form"
                    title="Update Status"
                    text="Change feature state"
                    options={statusOptions}
                    value={feedback.status}
                    name="status"
                />
                <Control
                    type="textarea-form"
                    title="Feedback Detail"
                    text="Include any specific comments on what should be improved, added, etc."
                    value={feedback.detail}
                    name="detail"
                />
                <div className="form__btns">
                    <Link 
                        to={`/inner/${feedback._id}`} 
                        className="form__cancelbtn menu__btn"
                    >
                        Cancel
                    </Link>
                    <Button className="form__addbtn menu__btn">Edit Feedback</Button>
                </div>
            </Form>
        </div>
    )
}

export default Edit;