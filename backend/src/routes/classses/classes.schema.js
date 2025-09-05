import Joi from "joi";

export const classSchema = Joi.object({
    level: Joi.string().trim().min(1).max(50).required(),
    name: Joi.string().trim().min(1).max(50).required(),
    teacherEmail: Joi.string().trim()
        .pattern(/^[a-zA-Z0-9]+@gmail\.com$/)
        .required(),
});