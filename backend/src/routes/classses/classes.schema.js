import Joi from "joi";

export const classSchema = Joi.object({
    level: Joi.string()
        .required()
        .custom((value, helpers) => {
            const strValue = String(value).trim();
            if (!strValue) return helpers.error('string.empty');
            if (value.length > 50) return helpers.error('string.max', {limit: 50});
            const allowedLevels = [
                "Primary 1",
                "Primary 2",
                "Primary 3",
                "Primary 4",
                "Primary 5",
                "Primary 6"
            ];
            if (!allowedLevels.includes(strValue)) return helpers.error('any.only');
            return value;
        }),
    name: Joi.string()
        .required()
        .custom((value, helpers) => {
            const strValue = String(value).trim();
            if (!strValue) return helpers.error('string.empty');
            if (value.length < 1) return helpers.error('string.min', {limit: 1});
            if (value.length > 50) return helpers.error('string.max', {limit: 50});
            return value;
        }),
    teacherEmail: Joi.string()
        .required()
        .custom((value, helpers) => {
            const strValue = String(value).trim();
            if (!strValue) return helpers.error('string.empty');
            if (value.length > 255) return helpers.error('string.max', {limit: 255});
            const emailPattern = /^[a-zA-Z0-9]+@gmail\.com$/;
            if (!emailPattern.test(value)) return helpers.error('string.pattern.base');
            return value;
        })
});