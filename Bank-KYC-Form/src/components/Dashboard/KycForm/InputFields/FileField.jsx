import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Delete } from "components/Icons";

const FileField = (props) => {
    const { name, type, register, errorMessage, label } = props;

    const fileRef = useRef(null);
    const [ image, setImage ] = useState(null);

    const previewFile = (event) => {
        if (event.target.files) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    const clearImage = () => {
        setImage(null);
        fileRef.current.value = "";
    };

    return (
        <div className="flex flex-col items-center justify-center w-1/2 col-span-3 mt-10 place-self-center">
            <div className="upload-file">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center pt-5 pb-6 cursor-pointer hover:underline">
                    {
                        image === null
                            ?
                            <>
                                <p className="mb-2 text-sm text-black"><span className="font-semibold">Upload </span>{label}</p>
                                <p className="text-xs text-black">PNG, JPG or JPEG (MAX. 800x400px)</p>
                            </>
                            :
                            <img src={image} className="my-8 w-72" />
                    }
                </label>

                <input
                    name={name}
                    id="dropzone-file"
                    type={type}
                    {...register(name)}
                    className="file-input"
                    onChange={previewFile}
                    accept="image/*"
                    ref={fileRef}
                />

                {
                    image &&
                    <button onClick={clearImage} type="button" className="flex items-center justify-center gap-4 px-6 py-1 my-4 text-white transition ease-in rounded-full shadow-md bg-primary hover:bg-secondary">
                        <p className="text-sm">
                            Delete Selected File
                        </p>
                        <Delete />
                    </button>
                }
            </div>

            <span className="error">{errorMessage}</span>
        </div>
    );
};

FileField.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    register: PropTypes.func,
    errorMessage: PropTypes.string,
    label: PropTypes.string
};

export default FileField;