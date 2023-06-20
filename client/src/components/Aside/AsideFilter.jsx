import React from "react";

import Button from "../Button.jsx";

import "../../styles/Aside/AsideFilter.scss";

const AsideFilter = ({ filter, onFilter }) => {
    const filters = ['All', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature'];


    return (
        <div className="aside-filter">
            {filters.map((f, i) => {
                if ((f === filter)) {
                    return <Button 
                                onClick={() => onFilter(f)} 
                                className="aside-filter__btn _active"
                                key={i}
                            >
                                {f}
                            </Button>
                } 
                else {
                    return <Button 
                                onClick={() => onFilter(f)} 
                                className="aside-filter__btn"
                                key={i}
                            >
                                {f}
                            </Button>
                }
            })}
        </div>
    );
}

export default AsideFilter;