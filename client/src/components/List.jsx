import React from "react";

import "../styles/List.scss";

const List = ({ className, commentsCount, children }) => {
    return (
        <div className={className}>
            {className === "comments-list"
                ? <div className="comments-list__count">
                    {commentsCount} Comments
                  </div>
                : null
            }
            {children}
        </div>
    )
}

export default List;