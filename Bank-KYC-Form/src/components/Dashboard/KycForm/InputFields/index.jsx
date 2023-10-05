import PropTypes from "prop-types";
import FileField from "components/Dashboard/KycForm/InputFields/FileField";
import TextField from "components/Dashboard/KycForm/InputFields/TextField";
import DropDown from "components/Dashboard/KycForm/InputFields/DropDown";

const InputFields = (props) => {
    const { name, type, label, options, placeholder, defaultValue, register, errorMessage } = props;

    if (type === "select") {
        return (
            <DropDown name={name} label={label} defaultValue={defaultValue} register={register} errorMessage={errorMessage} options={options} />
        );
    }

    else if (type === "file") {
        return (
            <FileField name={name} type={type} register={register} errorMessage={errorMessage} label={label} />
        );
    }

    else {
        return (
            <TextField name={name} type={type} register={register} label={label} placeholder={placeholder} errorMessage={errorMessage} />
        );
    }
};

InputFields.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    register: PropTypes.func,
    errorMessage: PropTypes.string
};

export default InputFields;