import React from "react";

import Button from "./Button.jsx";
import { BsPlusLg } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

import "../styles/Form.scss";

const Form = ({ title, imgCircle, onSubmitHandle, other = [], children }) => {
    let icon;

    const submitHandler = (e) => {
        e.preventDefault();
        onSubmitHandle(e.target, ...other);
    }

    if (imgCircle === 'create') {
        icon = <BsPlusLg color="white" size={40} />;
    }
    else if (imgCircle === 'edit') {
        icon = <AiFillEdit color="white" size={40} />
    }
    return (
        <form onSubmit={submitHandler} className="form">
            {imgCircle 
                ? <div className="form__circle">
                    {icon}
                  </div> 
                : null
            }
            <div className="form__title">{title}</div>
            {children}
        </form>
    )
}

export default Form;