const BasePage = require('./basePage');
const {expect} = require('@playwright/test');

class TeachersPage extends BasePage {

    async expectPlaceholderText(text) {
        await expect(this.page.locator(`text=${text}`)).toBeVisible();
    }

    async clickBackButton() {
        await this.page.getByRole('button', {name: 'Back'}).click()
    }

    async clickAddTeacherButton() {
        await this.page.getByRole('button', {name: 'Add Teacher'}).click()
    }

    async clearField(type) {
        type === "email" && await this.page.getByRole('textBox', {name: 'Email Address'}).clear()
        type === "contactNumber" && await this.page.getByRole('textBox', {name: 'Contact Number'}).clear()
    }

    async fillTeacherDetails({name, subject, email, contactNumber}) {
        name && await this.page.getByRole('textbox', {name: 'Name'}).fill(name)
        if (subject) {
            await this.page.getByRole('combobox', {name: 'Select a subject'}).click()
            await this.page.getByRole('option', {name: subject}).click();
        }
        email && await this.page.getByRole('textbox', {name: 'Email Address'}).fill(email)
        contactNumber && await this.page.getByRole('textbox', {name: 'Work Contact Number'}).fill(contactNumber)
    }

    async submitAddTeacherForm() {
        await this.page.getByRole('button', {name: 'Add Teacher'}).click()
    }

    async expectSuccessToastMessage() {
        await expect(this.page.locator('text=Teacher created Successfully')).toBeVisible();
        await this.page.waitForTimeout(2000)
    }

    async expectEmailAlreadyExistsToastMessage() {
        await expect(this.page.locator('text=Email already exists')).toBeVisible();
        await this.page.waitForTimeout(2000)
    }

    async expectContactNumberAlreadyExistsToastMessage() {
        await expect(this.page.locator('text=Contact number already exists')).toBeVisible();
        await this.page.waitForTimeout(2000)
    }


    async expectTableToBeVisible(isVisible = true) {
        if (isVisible) {
            await expect(this.page.getByRole('grid')).toBeVisible();
        } else {
            await expect(this.page.getByRole('grid')).not.toBeVisible();
        }

    }

    async checkTeacherTableHeaders(tableHeaders,) {
        const headers = await this.page.getByRole('columnheader').allTextContents();
        await expect(headers.map((header => header.trim()))).toEqual(tableHeaders);
    }

    async expectNumberOfRows(expectedCount) {
        const allRows = await this.page.getByRole('row').all();
        const dataRowsCount = allRows.length > 0 ? allRows.length - 1 : 0;
        expect(dataRowsCount).toBe(expectedCount);
    }

    async checkTeacherTableDetails(data = []) {
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

module.exports = TeachersPage;
