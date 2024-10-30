import PropTypes from "prop-types";

const DropDown = (props) => {
    const { name, label, defaultValue, register, errorMessage, options } = props;
    return (
        <div className="select-container">
            <label htmlFor={name}>{label}</label>
            <select className="select-field peer" defaultValue={defaultValue} name={name} id={name} {...register(name)}>
                {options.map(option => (
                    <option
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}>
                        {option.label}
                    </option>
                ))}
            </select>
            <span className="error">{errorMessage}</span>
        </div>
    );
};

DropDown.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.array,
    defaultValue: PropTypes.string,
    register: PropTypes.func,
    errorMessage: PropTypes.string
};

export default DropDown;