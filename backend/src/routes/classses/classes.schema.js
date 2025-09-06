import Joi from "joi";

export const classSchema = Joi.object({
    level: Joi.string()
        .trim()
        .valid(
            "Primary 1",
            "Primary 2",
            "Primary 3",
            "Primary 4",
            "Primary 5",
            "Primary 6"
        )
        .required(),
    name: Joi.string().trim().min(1).max(50).required(),
    teacherEmail: Joi.string().trim()
        .pattern(/^[a-zA-Z0-9]+@gmail\.com$/)
        .required(),
});