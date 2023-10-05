import PropTypes from "prop-types";

const TextField = (props) => {
    const { name, label, placeholder, type, register, errorMessage } = props;
    return (
        <div className="input-container">
            <label htmlFor={name}>{label}</label>

            <input
                className="input-field peer"
                id={name}
                placeholder={placeholder}
                type={type}
                name={name}
                {...register(name)}
            />
            <span className="error">{errorMessage}</span>
        </div>
    );
};

TextField.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    register: PropTypes.func,
    errorMessage: PropTypes.string
};

export default TextField;