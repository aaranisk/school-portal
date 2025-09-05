import {classSchema} from "./classes.schema.js";

describe("classSchema validation", () => {

    test("valid class data passes validation", () => {
        const validData = {
            level: "Primary 1",
            name: "Primary 1 Science",
            teacherEmail: "sarah@gmail.com"
        };

        const {error, value} = classSchema.validate(validData);
        expect(error).toBeUndefined();
        expect(value).toEqual(validData);
    });

    test("missing required fields fails validation", () => {
        const invalidData = {
            level: " ",
            name: " ",
            teacherEmail: " "
        };

        const {error} = classSchema.validate(invalidData, {abortEarly: false});
        expect(error).toBeDefined();
        const details = error.details;
        expect(details).toEqual(expect.arrayContaining([
            expect.objectContaining({type: 'string.empty', context: expect.objectContaining({key: 'level'})}),
            expect.objectContaining({type: 'string.empty', context: expect.objectContaining({key: 'name'})}),
            expect.objectContaining({
                type: 'string.empty',
                context: expect.objectContaining({key: 'teacherEmail'})
            })
        ]))
    });
    test("empty string required fields fails validation", () => {
        const invalidData = {
            level: "",
            name: "",
            teacherEmail: ""
        };

        const {error} = classSchema.validate(invalidData, {abortEarly: false});
        expect(error).toBeDefined();
        const details = error.details;
        expect(details).toEqual(expect.arrayContaining([
            expect.objectContaining({type: 'string.empty', context: expect.objectContaining({key: 'level'})}),
            expect.objectContaining({type: 'string.empty', context: expect.objectContaining({key: 'name'})}),
            expect.objectContaining({
                type: 'string.empty',
                context: expect.objectContaining({key: 'teacherEmail'})
            })
        ]))
    });


    test("invalid email fails validation", () => {
        const invalidData = {
            level: "Primary 2",
            name: "Primary 2 Mathmatics",
            teacherEmail: "invalid-email"
        };

        const {error} = classSchema.validate(invalidData);
        expect(error).toBeDefined();
        const details = error.details;
        expect(details).toEqual(expect.arrayContaining([
            expect.objectContaining({
                type: 'string.pattern.base',
                context: expect.objectContaining({key: 'teacherEmail'})
            })
        ]))
    });
    test("email that does not have gmail domain fails validation", () => {
        const invalidData = {
            level: "Primary 2",
            name: "Primary 2 Mathmatics",
            teacherEmail: "sarah@gov.sg"
        };

        const {error} = classSchema.validate(invalidData);
        expect(error).toBeDefined();
        const details = error.details;
        expect(details).toEqual(expect.arrayContaining([
            expect.objectContaining({
                type: 'string.pattern.base',
                context: expect.objectContaining({key: 'teacherEmail'})
            })
        ]))
    });

    test("fields exceeding max length fail validation", () => {
        const invalidData = {
            level: "L".repeat(51),
            name: "N".repeat(51),
            teacherEmail: "sarah@gmail.com"
        };
        const {error} = classSchema.validate(invalidData, {abortEarly: false});
        const details = error.details;
        expect(details).toEqual(expect.arrayContaining([
            expect.objectContaining({
                type: 'string.max',
                context: expect.objectContaining({key: 'level'})
            }),
            expect.objectContaining({
                type: 'string.max',
                context: expect.objectContaining({key: 'name'})
            })
        ]))
    });

});
