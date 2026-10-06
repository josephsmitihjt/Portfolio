import { defineConfig, devices } from "@playwright/test";

const basePath = process.env.PORTFOLIO_TEST_BASE_PATH || "/";
if (!["/", "/Portfolio/"].includes(basePath)) {
  throw new Error("PORTFOLIO_TEST_BASE_PATH must be / or /Portfolio/");
}
const baseURL = `http://127.0.0.1:4173${basePath}`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  reporter: "list",
  use: {
    baseURL,
    trace: "retain-on-failure",
    launchOptions: {
      executablePath: process.env.PORTFOLIO_BROWSER_PATH || "/usr/bin/chromium",
      args: ["--no-sandbox"],
    },
  },
  projects: [
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 1000 },
      },
    },
    {
      name: "mobile",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
  ],
  webServer: {
    command: `npm run preview -- --port 4173 --strictPort --base=${basePath}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
});
