import Joi from "joi";

export const teacherSchema = Joi.object({
    name: Joi.string()
        .required()
        .custom((value, helpers) => {
            const strValue = String(value).trim();
            if (!strValue) return helpers.error('string.empty');
            if (value.length < 1) return helpers.error('string.min', {limit: 1});
            if (value.length > 50) return helpers.error('string.max', {limit: 50})
            return value;
        }),
    subject: Joi.string().required()
        .custom((value, helpers) => {
            const strValue = String(value).trim();
            if (!strValue) return helpers.error('string.empty');
            if (value.length > 50) return helpers.error('string.max', {limit: 50});
            const allowedSubjects = [
                'English Language', 'Mother Tongue Language', 'Mathematics', 'Science',
                'Art', 'Music', 'Physical Education', 'Social Studies', 'Character and Citizenship Education'
            ];
            if (!allowedSubjects.includes(strValue)) return helpers.error('any.only');
            return value;
        }),
    email: Joi.string()
        .required()
        .custom((value, helpers) => {
            const strValue = String(value).trim();
            if (!strValue) return helpers.error('string.empty');
            if (value.length > 255) return helpers.error('string.max', {limit: 255});
            const emailPattern = /^[a-zA-Z0-9]+@gmail\.com$/;
            if (!emailPattern.test(strValue)) return helpers.error('string.pattern.base');
            return value;
        }),
    contactNumber: Joi.string()
        .required()
        .custom((value, helpers) => {
            const strValue = String(value).trim();
            if (!strValue) return helpers.error('string.empty');
            if (value.length > 8) return helpers.error('string.max', {limit: 8});
            const contactPattern = /^6\d{7}$/;
            if (!contactPattern.test(strValue)) return helpers.error('string.pattern.base');
            return value;
        })
});
