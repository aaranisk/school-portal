import Joi from "joi";

export const teacherSchema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    subject: Joi.string().min(1).max(50).required(),
    email: Joi.string()
        .pattern(/^[a-zA-Z0-9]+@gmail\.com$/)
        .required(),
    contactNumber: Joi.string()
        .pattern(/^6\d{7}$/)
        .required()
});
