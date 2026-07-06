import * as yup from "yup";

export const enquirySchema = yup.object({
	name: yup
		.string()
		.trim()
		.min(2, "Tell us your name")
		.required("Tell us your name"),
	email: yup
		.string()
		.trim()
		.email("Enter a valid email address")
		.required("We need your email to reply"),
	dial: yup.string().required("Code"),
	phone: yup
		.string()
		.trim()
		.matches(/^[0-9\s()-]{6,20}$/, "Enter a valid phone number")
		.required("We need a number to reach you"),
	arrival: yup.date().required("Choose an arrival date"),
	departure: yup
		.date()
		.min(yup.ref("arrival"), "Departure must fall after arrival")
		.required("Choose a departure date"),
	guests: yup.string().required("Select your party size"),
	occasion: yup.string().trim().default(""),
	message: yup.string().trim().default(""),
});

export type EnquiryPayload = yup.InferType<typeof enquirySchema>;
