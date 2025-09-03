const {defineConfig} = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    timeout: 30000,
    use: {
        headless: true,
        baseURL: 'http://localhost:5173',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
    retries: 1,
});
