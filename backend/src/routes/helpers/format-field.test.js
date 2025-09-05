import formatField from "./format-field.js";

describe('formatField', () => {
    test('single word fields', () => {
        expect(formatField('contact')).toBe('Contact');
        expect(formatField('email')).toBe('Email');
    });

    test('two word camelCase fields', () => {
        expect(formatField('contactNumber')).toBe('Contact number');
        expect(formatField('teacherEmail')).toBe('Teacher email');
        expect(formatField('homeAddress')).toBe('Home address');
    });

    test('fields with more than two words', () => {
        expect(formatField('firstNameLastName')).toBe('First name last name');
        expect(formatField('workPhoneNumber')).toBe('Work phone number');
    });
});