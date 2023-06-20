import React, { useContext, useEffect, useState } from "react";

import Aside from "../components/Aside/Aside.jsx";
import AsideBoard from "../components/Aside/AsideBoard.jsx";
import AsideFilter from "../components/Aside/AsideFilter.jsx";
import Menu from "../components/Menu.jsx";
import MainContainer from "../components/MainContainer.jsx";
import Button from "../components/Button.jsx";
import Control from "../components/Control.jsx";
import List from "../components/List.jsx";
import Feedback from "../components/Feedback.jsx";

import { BsFillPersonFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";

import { Link, useNavigate } from "react-router-dom";
import { fetchAll, upvote } from "../http/feedbacksApi.js";
import { AuthTokenContext, UserContext } from "../context.js";

const Main = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [filter, setFilter] = useState('All');
    const [sortValue, setSortValue] = useState(-1);
    const { logOut, token } = useContext(AuthTokenContext);
    const user = useContext(UserContext);
    const navigate = useNavigate();

    const onFilterHandler = (filter) => {
        setFilter(filter);
    }

    const onSortHandler = (sortValue) => {
        setSortValue(sortValue);
    }

    const getAllFeedbacks = async (filter, sortValue) => {
        const data = await fetchAll(filter, sortValue);
        setFeedbacks(data);
    };

    const onUpvoteHandler = async (id) => {
        const data = await upvote(id, token);
        if (data.success) {
            getAllFeedbacks(filter, sortValue);
        }
        else {
            alert(data.errorMessages[0]);
            if (data.status === 403) {
                navigate("/signin");
            }
        }
    }

    useEffect(() => {
        getAllFeedbacks(filter, sortValue);
    }, [filter, sortValue]);

    return (
        <div className="_container">
            <Aside>
                <AsideBoard />
                <AsideFilter 
                    filter={filter} 
                    onFilter={onFilterHandler} 
                />
            </Aside>

            <MainContainer>
                <Menu 
                    type="menu" 
                    countFeedbacks={feedbacks.length}
                >
                    <Control 
                        type="menu-select" 
                        onHandle={onSortHandler}
                    />
                    {!user 
                        ? <Link 
                            to="/signin" 
                            className="menu__authbtn"
                          >
                            Log In
                            <BsFillPersonFill size={25} />
                          </Link>

                        : <Button 
                            onClick={logOut}
                            className="menu__authbtn"
                          >
                            {user.login}
                            <FiLogOut size={25} />
                          </Button>
                        }
                    {user && user.role === "Admin" 
                        ? <Link 
                            to="/create" 
                            className="menu__btn menu__addfeedback"
                          >
                            + Add Feedback
                          </Link>
                        : null
                    }
                </Menu>
                <List className="feedbacks">
                    {user 
                        ? feedbacks
                            .map(f => user.upvotedFeedbacks.find(uf => uf.feedback_id === f._id) 
                                ? <Feedback 
                                    feedback={f} 
                                    onUpvoteHandler={() => onUpvoteHandler(f._id)} 
                                    key={f._id}
                                    upvoted 
                                />
                                : <Feedback 
                                    feedback={f} 
                                    onUpvoteHandler={() => onUpvoteHandler(f._id)} 
                                    key={f._id}
                                />
                            ) 
                        : feedbacks.map(f => 
                            <Feedback
                                feedback={f}
                                onUpvoteHandler={() => onUpvoteHandler(f._id)}
                                key={f._id}
                            />
                        )
                    }
                </List>
            </MainContainer>
        </div>
    )
}

export default Main;