import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

import Menu from "../components/Menu.jsx";
import Button from "../components/Button.jsx";
import Feedback from "../components/Feedback.jsx";
import List from "../components/List.jsx";
import Comment from "../components/Comment.jsx";
import Form from "../components/Form.jsx";
import { Link } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
import { fetchOne, postComment, upvote } from "../http/feedbacksApi.js";
import { AuthTokenContext, UserContext } from "../context.js";

const Inner = () => {
    const maxCharacters = 250;

    const [feedback, setFeedback] = useState({});
    const [comments, setComments] = useState([]);
    const [leftCharacters, setLeftCharacters] = useState(maxCharacters);
    const textFieldRef = useRef(null);
    const { token } = useContext(AuthTokenContext);
    const user = useContext(UserContext);
    const params = useParams();
    const navigate = useNavigate();

    const getOneFeedback = async (id) => {
        const data = await fetchOne(id);
        setFeedback(data);
        setComments(data.comments);
    };

    const onUpvoteHandler = async () => {
        const data = await upvote(feedback._id, token);
        if (data.success) {
            getOneFeedback(feedback._id);
        }
        else {
            alert(data.errorMessages[0]);
            if (data.status === 403) {
                navigate("/signin");
            }
        }
    }

    const postCommentHandler = async (form, id, token) => {
        const data = await postComment(id, form.text.value, token);
        if (!data.success) {
            alert(data.errorMessages[0]);
            if (data.status === 403) {
                navigate("/signin");
            }
        }
        else {
            setFeedback(data.feedback);
            setComments(data.feedback.comments);
            setLeftCharacters(maxCharacters);
            textFieldRef.current.value = '';
        }
    }

    const onCharLeftHandler = e => {
        const textFieldLength = e.target.value.length;
        setLeftCharacters(maxCharacters - textFieldLength);
    }
    
    useEffect(() => {
        getOneFeedback(params.id);
    }, []);

    const goBack = () => navigate(-1);

    return (
        <div className="_container2">
            <Menu type="menu _inner">
                <Button onClick={goBack} className="menu__back">
                    <span className="menu__arrowback">
                        <MdArrowForwardIos size={20} />
                    </span>
                    Go Back
                </Button>

                {user && user.role === "Admin"
                    ? <Link 
                        to={`/edit/${feedback._id}`}
                        className="menu__btn menu__editfeedback"
                      >
                        Edit Feedback
                      </Link>
                    : null
                }
            </Menu>
            {user && user.upvotedFeedbacks.find(uf => uf.feedback_id === feedback._id)
                ? <Feedback
                    feedback={feedback}
                    onUpvoteHandler={onUpvoteHandler} 
                    className="feedback _inner"
                    upvoted 
                  />
                : <Feedback
                    feedback={feedback}
                    onUpvoteHandler={onUpvoteHandler} 
                    className="feedback _inner" 
                  />
            }
            <List className="comments-list" commentsCount={feedback.countComments}>
                {comments.map(c => <Comment comment={c} key={c._id} />)}
            </List>
            <Form 
                onSubmitHandle={postCommentHandler} 
                title="Add comment"
                other={[feedback._id, token]}
            >
                <textarea 
                    className="form__field" 
                    placeholder="Type your comment here" 
                    name="text"
                    ref={textFieldRef}
                    onChange={(e) => onCharLeftHandler(e)}
                    maxLength={maxCharacters}
                >
                </textarea>
                <div className="form__row">
                    <div className="form__count">{leftCharacters} Characters left</div>
                    <Button className="form__addbtn menu__btn">Post Comment</Button>
                </div>
            </Form>
        </div>
    )
}

export default Inner;