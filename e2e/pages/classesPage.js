const BasePage = require('./basePage');
const {expect} = require('@playwright/test');

class ClassesPage extends BasePage {

    async expectPlaceholderText(text) {
        await expect(this.page.locator(`text=${text}`)).toBeVisible();
    }

    async clickBackButton() {
        await this.page.getByRole('button', {name: 'Back'}).click()
    }

    async clickAddClassButton() {
        await this.page.getByRole('button', {name: 'Add Class'}).click()
    }

    async clickFormTeacherSelect(name = 'Assign a form teacher') {
        await this.page.getByRole('combobox', {name: name}).click()
    }

    async expectNoTeachers() {
        await expect(this.page.locator('text=No existing teachers')).toBeVisible();
        await expect(this.page.locator('text=Add a teacher')).toBeVisible();
    }

    async clickAddTeacher() {
        await this.page.locator('text=Add a teacher').click()
    }

    async fillClassDetails({classLevel, className, formTeacher}) {
        if (classLevel) {
            await this.page.getByRole('combobox', {name: 'Select a level'}).click()
            await this.page.getByRole('option', {name: classLevel}).click();
        }
        className && await this.page.getByRole('textbox', {name: 'Class Name'}).fill(className)
        if (formTeacher) {
            await this.clickFormTeacherSelect('Assign a form teacher')
            await this.page.getByRole('option', {name: formTeacher}).click();
        }
    }

    async submitAddClassForm() {
        await this.page.getByRole('button', {name: 'Add Class'}).click()
    }

    async expectSuccessToastMessage() {
        await expect(this.page.locator('text=Class created Successfully')).toBeVisible();
        await this.page.waitForTimeout(2000)
    }

    async expectTeacherAlreadyHasClassToastMessage() {
        await expect(this.page.locator('text=Selected teacher already has a class')).toBeVisible();
        await this.page.waitForTimeout(2000)
    }

    async expectTableToBeVisible(isVisible = true) {
        if (isVisible) {
            await expect(this.page.getByRole('grid')).toBeVisible();
        } else {
            await expect(this.page.getByRole('grid')).not.toBeVisible();
        }

    }

    async checkClassTableHeaders(tableHeaders,) {
        const headers = await this.page.getByRole('columnheader').allTextContents();
        await expect(headers.map((header => header.trim()))).toEqual(tableHeaders);
    }

    async expectNumberOfRows(expectedCount) {
        const allRows = await this.page.getByRole('row').all();
        const dataRowsCount = allRows.length > 0 ? allRows.length - 1 : 0;
        expect(dataRowsCount).toBe(expectedCount);
    }

    async checkClassTableDetails(data = []) {
        for (let i = 0; i < data.length; i++) {
            const rowCells = await this.page
                .getByRole('row')
                .nth(i + 1)
                .getByRole('gridcell')
                .allTextContents();
            await expect(rowCells).toEqual(data[i]);

        }
    }

    async expectErrorValidationMessage(expectedMessages = []) {
        const errors = await this.page.locator('.MuiFormHelperText-root').allTextContents();
        expect(errors).toEqual(expectedMessages);
    }

    async expectNoValidationErrorMessage() {
        const count = await this.page.locator('.MuiFormHelperText-root').count();
        expect(count).toBe(0);
    }
}

module.exports = ClassesPage;
