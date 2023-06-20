import React from "react";

import Button from "./Button.jsx";

import "../styles/Feedback.scss";
import { Link } from "react-router-dom";
import { MdArrowForwardIos, MdModeComment } from "react-icons/md";

const Feedback = ({ className = "feedback", feedback, onUpvoteHandler, upvoted }) => {
    let classNameBtn = "feedback__upvote";
    let classNameArrow = "feedback__arrow";

    if (upvoted) {
        classNameBtn += " upvoted";
        classNameArrow += " upvoted";
    }

    return (
        <div className={className}>
            <Button 
                onClick={onUpvoteHandler} 
                className={classNameBtn}
            >
                <span className={classNameArrow}>
                    <MdArrowForwardIos size={20} />
                </span>
                {feedback.upvotes}
            </Button>
            <div className="feedback__content">
                <Link 
                    to={`/inner/${feedback._id}`} 
                    className="feedback__title"
                >
                    {feedback.title}
                </Link>
                <div className="feedback__detail">{feedback.detail}</div>
                <div className="feedback__category">{feedback.category}</div>
            </div>
            <div className="feedback__countcomments">
                <MdModeComment color="#99b0ef" size={30} />
                {feedback.countComments}
            </div>
        </div>
    )
}

export default Feedback;