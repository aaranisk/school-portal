import {teacherSchema} from "./teachers.schema.js";

describe("teacherSchema validation", () => {

    test("valid teacher data passes validation", () => {
        const validData = {
            name: "Sarah Lim",
            subject: "English Language",
            email: "sarah@gmail.com",
            contactNumber: "61234567"
        };
        const {error, value} = teacherSchema.validate(validData);
        expect(error).toBeUndefined();
        expect(value).toEqual(validData);
    });

    test("missing required fields fails validation", () => {
        const invalidData = {
            name: "",
            subject: "",
            email: "",
            contactNumber: ""
        };

        const {error} = teacherSchema.validate(invalidData, {abortEarly: false});
        expect(error).toBeDefined();
        const details = error.details;
        expect(details).toEqual(expect.arrayContaining([
            expect.objectContaining({type: 'string.empty', context: expect.objectContaining({key: 'name'})}),
            expect.objectContaining({
                type: 'string.empty',
                context: {label: 'subject', value: '', key: 'subject'}
            }),
            expect.objectContaining({type: 'string.empty', context: expect.objectContaining({key: 'email'})}),
            expect.objectContaining({
                type: 'string.empty',
                context: {label: 'contactNumber', value: '', key: 'contactNumber'}
            })
        ]))
    });

    test("empty string required fields fails validation", () => {
        const invalidData = {
            name: " ",
            subject: " ",
            email: " ",
            contactNumber: " "
        };
        const {error} = teacherSchema.validate(invalidData, {abortEarly: false});
        expect(error).toBeDefined();
        const details = error.details;
        expect(details).toEqual(expect.arrayContaining([
            expect.objectContaining({type: 'string.empty', context: expect.objectContaining({key: 'name'})}),
            expect.objectContaining({
                type: 'string.empty',
                context: expect.objectContaining({key: 'subject'})
            }),
            expect.objectContaining({type: 'string.empty', context: expect.objectContaining({key: 'email'})}),
            expect.objectContaining({
                type: 'string.empty',
                context: expect.objectContaining({key: 'contactNumber'}),
            })
        ]))
    });

    test("invalid email fails validation", () => {
        const invalidData = {
            name: "Vanessa Goh",
            subject: "Mathematics",
            email: "invalid-email",
            contactNumber: "12345678"
        };

        const {error} = teacherSchema.validate(invalidData);
        const details = error.details;
        expect(error).toBeDefined();
        expect(details).toEqual(expect.arrayContaining([
            expect.objectContaining({
                type: 'string.pattern.base',
                context: expect.objectContaining({key: 'email'})
            })
        ]))
    });

    test("email without gmail domain fails validation", () => {
        const invalidData = {
            name: "Vanessa Goh",
            subject: "Mathematics",
            email: "vanessa@gov.sg",
            contactNumber: "12345678"
        };

        const {error} = teacherSchema.validate(invalidData);
        const details = error.details;
        expect(error).toBeDefined();
        expect(details).toEqual(expect.arrayContaining([
            expect.objectContaining({
                type: 'string.pattern.base',
                context: expect.objectContaining({key: 'email'})
            })
        ]))
    });

    test("contactNumber not 8 digits fails validation", () => {
        const invalidData = {
            name: "Jane Lim",
            subject: "Science",
            email: "jane@gmail.com",
            contactNumber: "12345"
        };

        const {error} = teacherSchema.validate(invalidData);
        expect(error).toBeDefined();
        const details = error.details;
        expect(details).toEqual(expect.arrayContaining([
            expect.objectContaining({
                type: 'string.pattern.base',
                context: expect.objectContaining({key: 'contactNumber'})
            })
        ]))
    });

    test("contactNumber that is 8 digits but does not start with 6 fails validation", () => {
        const invalidData = {
            name: "Jane Lim",
            subject: "Science",
            email: "jane@gmail.com",
            contactNumber: "98746512"
        };

        const {error} = teacherSchema.validate(invalidData);
        expect(error).toBeDefined();
        const details = error.details;
        expect(details).toEqual(expect.arrayContaining([
            expect.objectContaining({
                type: 'string.pattern.base',
                context: expect.objectContaining({key: 'contactNumber'})
            })
        ]))
    });

    test("fields exceeding max length fail validation", () => {
        const invalidData = {
            name: "N".repeat(51),
            subject: "Art",
            email: "sarah@gmail.com",
            contactNumber: "12345678"
        };

        const {error} = teacherSchema.validate(invalidData, {abortEarly: false});
        const details = error.details;
        expect(details).toEqual(expect.arrayContaining([
            expect.objectContaining({
                type: 'string.max',
                context: expect.objectContaining({key: 'name'})
            }),
        ]))
    });

    test("valid subject validation", () => {
        const invalidData = {
            name: "Sarah",
            subject: "Something",
            email: "sarah@gmail.com",
            contactNumber: "12345678"
        };

        const {error} = teacherSchema.validate(invalidData, {abortEarly: false});
        const details = error.details;
        expect(details).toEqual(expect.arrayContaining([
            expect.objectContaining({
                type: 'any.only',
                context: expect.objectContaining({key: 'subject'})
            })
        ]))
    });

});
