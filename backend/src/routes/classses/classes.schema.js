import Joi from "joi";

export const classSchema = Joi.object({
    level: Joi.string().min(1).max(50).required(),
    name: Joi.string().min(1).max(50).required(),
    teacherEmail: Joi.string()
        .pattern(/^[a-zA-Z0-9]+@gmail\.com$/)
        .required(),
});