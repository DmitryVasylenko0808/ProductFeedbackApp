import React from "react";

import "../styles/Menu.scss";

const Menu = ({ children, type, countFeedbacks }) => {
    return (
        <div className={type}>
            {type === 'menu' 
                ? <div className="menu__suggestions">{countFeedbacks} Suggestions</div>
                : null
            }
            {children}
        </div>
    )
}

export default Menu;