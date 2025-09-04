const {test, expect} = require('@playwright/test');
const {resetDB} = require('../fixtures/dbReset');
const TeachersPage = require("../pages/teachersPage");


test.describe('Teacher E2E', () => {
    test.beforeEach(async ({page}) => {
        resetDB();
        const teachersPage = new TeachersPage(page);
        await teachersPage.goto('/teachers');
    });
    test.afterEach(async () => {
        await resetDB();
    })
    test('administrator is able to add teacher and view on teachers page', async ({page}) => {
        const teachersPage = new TeachersPage(page);
        await teachersPage.expectPlaceholderText('There are no existing teachers yet')
        await teachersPage.clickAddTeacherButton()
        await teachersPage.fillTeacherDetails({
            name: "William",
            subject: "Mathematics",
            email: "william@gmail.com",
            contactNumber: "61234567"
        })
        await teachersPage.submitAddTeacherForm()
        await teachersPage.expectSuccessToastMessage()
        await teachersPage.expectTableToBeVisible(true)
        await teachersPage.checkTeacherTableHeaders(['#', 'Name', 'Subject', 'Email', 'Work Contact'])
        await teachersPage.expectNumberOfRows(1)
        await teachersPage.checkTeacherTableDetails([
            ['1', 'William', 'Mathematics', 'william@gmail.com', '6123 4567']])
        await teachersPage.clickAddTeacherButton()
        await teachersPage.expectTableToBeVisible(false)
        await teachersPage.clickBackButton()
        await teachersPage.expectTableToBeVisible(true)
        await teachersPage.clickAddTeacherButton()
        await teachersPage.fillTeacherDetails({
            name: "Sarah",
            subject: "Science",
            email: "sarah@gmail.com",
            contactNumber: "62389123"
        })
        await teachersPage.submitAddTeacherForm()
        await teachersPage.expectSuccessToastMessage()
        await teachersPage.expectTableToBeVisible(true)
        await teachersPage.expectNumberOfRows(2)
        await teachersPage.checkTeacherTableDetails([
            ['1', 'William', 'Mathematics', 'william@gmail.com', '6123 4567'],
            ['2', 'Sarah', "Science", "sarah@gmail.com", "6238 9123"]])
        await teachersPage.clickAddTeacherButton()
        await teachersPage.submitAddTeacherForm()
        await teachersPage.expectErrorValidationMessage([
            'Name is required.',
            'Subject is required.',
            'Email address is required.',
            'Work contact number is required.'
        ]);
        await teachersPage.fillTeacherDetails({name: "Sarah", subject: "Art", email: "invalid email"})
        await teachersPage.expectErrorValidationMessage([
            "This email is invalid.",
            'Work contact number is required.'
        ]);
        await teachersPage.fillTeacherDetails({email: "sarah@hotmail.com"})
        await teachersPage.expectErrorValidationMessage([
            "This email is invalid.",
            'Work contact number is required.'
        ]);
        await teachersPage.fillTeacherDetails({email: "sarah@gmail.com"})
        await teachersPage.expectErrorValidationMessage([
            'Work contact number is required.'
        ]);
        await teachersPage.fillTeacherDetails({contactNumber: "111"})
        await teachersPage.expectErrorValidationMessage([
            'This work contact number is invalid.'
        ]);
        await teachersPage.clearField('contactNumber')
        await teachersPage.fillTeacherDetails({contactNumber: "81256932"})
        await teachersPage.expectErrorValidationMessage([
            'This work contact number is invalid.'
        ]);
        await teachersPage.clearField('contactNumber')
        await teachersPage.fillTeacherDetails({contactNumber: "62389123"})
        await teachersPage.expectNoValidationErrorMessage();
        await teachersPage.submitAddTeacherForm()
        await teachersPage.expectEmailAlreadyExistsToastMessage()
        await teachersPage.clearField('email')
        await teachersPage.fillTeacherDetails({email: "sarahlim@gmail.com"})
        await teachersPage.submitAddTeacherForm()
        await teachersPage.expectContactNumberAlreadyExistsToastMessage()
        await teachersPage.clearField('contactNumber')
        await teachersPage.fillTeacherDetails({contactNumber: "65238912"})
        await teachersPage.submitAddTeacherForm()
        await teachersPage.expectSuccessToastMessage()
        await teachersPage.expectTableToBeVisible(true)
        await teachersPage.expectNumberOfRows(3)
        await teachersPage.checkTeacherTableDetails([
            ['1', 'William', 'Mathematics', 'william@gmail.com', '6123 4567'],
            ['2', 'Sarah', "Science", "sarah@gmail.com", "6238 9123"],
            ['3', 'Sarah', "Art", "sarahlim@gmail.com", "6523 8912"]])


    });


});
