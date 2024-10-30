import * as yup from "yup";

const formSchema = yup.object().shape({
    fullName: yup
    .string()
    .required("Full Name is Required")
    .min(3, "Name can't be less than 3 characters"),
    gender: yup.
    string()
    .required("Gender must be selected"),
    dob: yup
    .string()
    .required("Date of Birth must be selected"),
    fatherName: yup
    .string()
    .required("Father's Name is Required"),
    grandFatherName: yup.string(),
    maritalStatus: yup.string(),
    "occupation-field": yup
    .string()
    .required("You must select your occupation field"),
    emailAddress: yup
    .string()
    .email("Email Adress must be valid")
    .required("Email address is required"),
    contactNumber: yup
    .string()
    .required("Contact number is required")
    .matches("^[0-9]", "Contact Number can't contain any letters or special characters"),
    state: yup
    .string()
    .required("State must be selected")
    .matches(/^[a-zA-Z ]*$/, "State name can't contain numbers or special characters"),
    district: yup
    .string()
    .matches(/^[a-zA-Z ]*$/, "District name can't contain numbers or special characters")
    .required("District is required field"),
    municipality: yup
    .string()
    .matches(/^[a-zA-Z ]*$/, "Municipality name can't contain numbers or special characters")
    .required("Municipality is required field"),
    wardNumber: yup
    .string()
    .required("Ward number is required field")
    .matches("^[0-9]", "Ward Number can't contain any letters or special characters"),
    toleName: yup.string(),
    documentType: yup
    .string()
    .required("Document Type must be selected"),
    citizenshipNumber: yup
    .string()
    .required("Citizenship Number is required")
    .matches("^[0-9]", "Citizenship Number can't contain any letters or special characters"),
    issuedDistrict: yup
    .string()
    .required("Issued District is required field")
    .matches("^[a-zA-Z ]*$", "District name can't contain numbers or special characters"),
    dateOfIssue: yup
    .string()
    .required("Date of Issue must be selected"),
    profilePicture: yup.mixed()
});

export default formSchema;