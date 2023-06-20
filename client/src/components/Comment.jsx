import React from "react";

import "../styles/Comment.scss";

const Comment = ({ comment }) => {
    console.log(comment);
    return (
        <div className="comment">
            <img src={`http://localhost:3000/static/${comment.author.avatar}`} className="comment__avatar"></img>
            <div className="comment__main">
                <div className="comment__row">
                    <div className="comment__user">
                        <div className="comment__username">{`${comment.author.name} ${comment.author.surname}`}</div>
                        <div className="commnet__login">{`@${comment.author.login}`}</div>
                    </div>
                    <button className="comment__reply">Reply</button>
                </div>
                <div className="comment__text">
                    {comment.text}
                </div>
            </div>
        </div>
    )
}

export default Comment;