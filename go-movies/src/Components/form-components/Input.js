const Input = ({ title, name, type, className, placeholder, errorMsg, errorDiv, ...otherProps}) => {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">
                {title}
            </label>
            <input
                {...otherProps} // destructuring in Javascript, get all props provided without having to explicitly type them out
                // destructuring props before explicitly defining props like below will ensure that you override the props
                // even when passed to the component
                type={type}
                className={`form-control ${className}`}
                id={name}
                name={name}
                // value={props.value}
                // onChange={props.handleChange}
                placeholder={placeholder}
                // {..props} doing it here will give you flexibility of overriding the above props(default)
            />
            <div className={errorDiv}>{errorMsg}</div>
        </div>
    );
};

export default Input;