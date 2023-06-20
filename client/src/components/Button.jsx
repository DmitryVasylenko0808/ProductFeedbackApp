import React from "react";

const Button = ({ className, type, onClick, children }) => {
    return (
        <button onClick={onClick} className={className}>
            {children}
        </button>
    )
}

export default Button;