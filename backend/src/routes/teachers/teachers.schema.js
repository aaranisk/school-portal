import Joi from "joi";

export const teacherSchema = Joi.object({
    name: Joi.string().trim().min(1).max(50).required(),
    subject: Joi.string()
        .trim()
        .valid(
            'English Language', 'Mother Tongue Language', 'Mathematics', 'Science', 'Art', 'Music', 'Physical Education', 'Social Studies', 'Character and Citizenship Education'
        )
        .required(),
    email: Joi.string().trim()
        .pattern(/^[a-zA-Z0-9]+@gmail\.com$/)
        .required(),
    contactNumber: Joi.string().trim()
        .pattern(/^6\d{7}$/)
        .required()
});
