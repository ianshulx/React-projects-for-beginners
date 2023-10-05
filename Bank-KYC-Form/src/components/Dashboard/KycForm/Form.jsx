import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema, formConfig } from "components/Dashboard/KycForm/validation";
import { InputFields } from "components/Dashboard/KycForm";

const Form = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(formSchema)
    });

    const handleFormSubmit = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="form min-h-47rem">
            {formConfig.sections.map(section => (
                <div className="mb-20" key={section.id}>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-9 bg-primary"></div>
                        <p className="section-heading">{section.heading}</p>
                    </div>

                    <div className="grid items-start content-center grid-cols-3 gap-x-20 gap-y-6">
                        {section.fields.map(field => {
                            const { id, name, type, label, options, placeholder, defaultValue } = field;
                            return (
                                <InputFields
                                    key={id}
                                    placeholder={placeholder}
                                    name={name}
                                    type={type}
                                    label={label}
                                    options={options}
                                    defaultValue={defaultValue}
                                    register={register}
                                    errorMessage={errors[`${name}`]?.message}
                                />
                            );
                        }
                        )}
                    </div>
                </div>
            ))}

            <button
                type="submit"
                className="w-full p-4 font-bold text-white transition ease-in rounded-md bg-primary hover:bg-secondary"
            >
                Submit Details for KYC Verification
            </button>
        </form>
    );
};

export default Form;