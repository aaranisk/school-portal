class ModuleBarHelper {
    constructor(page) {
        this.page = page;
    }

    async goToClassesPage() {
        await this.page.getByRole('link', {name: 'Classes'}).click();
    }

    async goToTeachersPage() {
        await this.page.getByRole('link', {name: 'Teachers'}).click()
    }
}

module.exports = {ModuleBarHelper};
