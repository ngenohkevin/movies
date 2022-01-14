const Select = ({name, value, handleChange, placeholder, title, options, ...otherProps}) => {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">
                {" "}
                {title}{" "}
            </label>
            <select
                {...otherProps}
                className="form-select"
                name={name}
                // value={value}
                // onChange={handleChange}
            >
                <option value="">{placeholder}</option>
                {options?.map?.((option) => { // check so that it doesn't throw an error when null/undefined
                    return (
                        <option
                            className="form-select"
                            key={option.id}
                            value={option.id}
                            label={option.value}
                        >
                            {option.value}
                        </option>
                    )
                })}
            </select>
        </div>
    );
};

export default Select;