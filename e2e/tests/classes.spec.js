const {test, expect} = require('@playwright/test');
const {resetDB} = require('../fixtures/dbReset');

const ClassesPage = require("../pages/classesPage");
const {ModuleBarHelper} = require("../helpers/moduleHelper");
const TeachersPage = require("../pages/teachersPage");


test.describe('Class E2E', () => {
    test.beforeEach(async ({page}) => {
        resetDB();
        const classesPage = new ClassesPage(page);
        await classesPage.goto('/');
    });
    test.afterEach(async () => {
        await resetDB();
    })
    test('administrator is able to add class and view on classes page', async ({page}) => {
        const classesPage = new ClassesPage(page);
        const teachersPage = new TeachersPage(page);
        await classesPage.expectPlaceholderText('There are no existing classes yet')
        await classesPage.clickAddClassButton()
        await classesPage.fillClassDetails({
            classLevel: "Primary 2",
            className: "2 A",
        })
        await classesPage.clickFormTeacherSelect('Assign a form teacher')
        await classesPage.expectNoTeachers()
        await classesPage.clickAddTeacher()
        await teachersPage.fillTeacherDetails({
            name: "Richard",
            subject: "Science",
            email: "richard@gmail.com",
            contactNumber: "62353535"
        })
        await teachersPage.submitAddTeacherForm()
        await teachersPage.expectSuccessToastMessage()
        await teachersPage.expectTableToBeVisible(true)
        const moduleBar = new ModuleBarHelper(page);
        await moduleBar.goToClassesPage();
        await classesPage.clickAddClassButton()
        await classesPage.fillClassDetails({
            classLevel: "Primary 2",
            className: "2 A",
            formTeacher: "Richard",
        })
        await classesPage.submitAddClassForm()
        await classesPage.expectSuccessToastMessage()
        await classesPage.expectTableToBeVisible(true)
        await classesPage.checkClassTableHeaders(['#', 'Class Level', 'Class Name', 'Form Teacher'])
        await classesPage.expectNumberOfRows(1)
        await classesPage.checkClassTableDetails([
            ['1', 'Primary 2', '2 A', 'Richard']])
        await classesPage.clickAddClassButton()
        await classesPage.expectTableToBeVisible(false)
        await classesPage.clickBackButton()
        await classesPage.expectTableToBeVisible(true)
        await classesPage.clickAddClassButton()
        await classesPage.fillClassDetails({
            classLevel: "Primary 2",
            className: "2 B",
            formTeacher: "Richard",
        })
        await classesPage.submitAddClassForm()
        await classesPage.expectTeacherAlreadyHasClassToastMessage()
        await moduleBar.goToTeachersPage();
        await teachersPage.clickAddTeacherButton()
        await teachersPage.fillTeacherDetails({
            name: "Susan",
            subject: "Character and Citizenship Education",
            email: "susan@gmail.com",
            contactNumber: "61135897"
        })
        await teachersPage.submitAddTeacherForm()
        await teachersPage.expectSuccessToastMessage()
        await teachersPage.expectTableToBeVisible(true)
        await teachersPage.expectNumberOfRows(2)
        await moduleBar.goToClassesPage();
        await classesPage.clickAddClassButton()
        await classesPage.submitAddClassForm()
        await classesPage.expectErrorValidationMessage([
            'Class level is required.',
            'Class name is required.',
            'Form Teacher is required.',
        ]);
        await classesPage.fillClassDetails({
            classLevel: "Primary 2",
            className: "2 B",
            formTeacher: "Susan",
        })
        await classesPage.submitAddClassForm()
        await classesPage.expectNoValidationErrorMessage()
        await classesPage.expectSuccessToastMessage()
        await classesPage.expectTableToBeVisible(true)
        await classesPage.expectNumberOfRows(2)
        await classesPage.checkClassTableDetails([
            ['1', 'Primary 2', '2 A', 'Richard'],
            ['2', 'Primary 2', '2 B', 'Susan']])
    });


});
