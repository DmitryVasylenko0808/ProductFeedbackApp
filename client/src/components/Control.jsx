import React from "react";

const Control = ({ type, typeInput = "text", onHandle, name, title, text, value, options = [] }) => {
    const menuSelect = (
        <label className="menu__label">
            Sort by :
            <select className="menu__sort" onChange={e => onHandle(e.target.value)} name={name}>
                <option className="menu__itemsort" value="-1">Most Upvotes</option>
                <option className="menu__itemsort" value="1">Not Most Upvotes</option>
            </select>
        </label>
    );
    
    const formControlInput = (
        <div className="form__control">
            <div className="form__label">{title}</div>
            <div className="form__text">{text}</div>
            <input type={typeInput} className="form__input" defaultValue={value} name={name}/>
        </div>
    );
    
    const formControlSelect = (
        <div className="form__control">
            <div className="form__label">{title}</div>
            <div className="form__text">{text}</div>
            <select className="form__select" name={name}>
                {options.map(o => <option value={o.value} selected={o.value === value}>{o.title}</option>)}
            </select>
        </div>
    );
    
    const formControlTextArea = (
        <div className="form__control">
            <div className="form__label">{title}</div>
            <div className="form__text">{text}</div>
            <textarea className="form__field" defaultValue={value} name={name}></textarea>
        </div>
    )

    let control;
    if (type === 'menu-select') {
        control = menuSelect;
    }
    else if (type === 'input-form') {
        control = formControlInput;
    }
    else if (type === 'select-form') {
        control = formControlSelect;
    }
    else if (type === 'textarea-form') {
        control = formControlTextArea;
    }
    else {
        control = null;
    }

    return control;
}

export default Control;