import React from "react";

import "../../styles/Aside/Aside.scss";

const Aside = ({ children }) => {
    return (
        <div className="aside">
            {children}
        </div>
    )
}

export default Aside;