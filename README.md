# [Storybook](https://storybook.js.org/docs/angular/get-started/why-storybook)

Storybook is a tool that helps you develop and showcase UI components in isolation. 
It provides a sandbox environment for each component, allowing you to view and interact with them independently of the rest of your application. 

## ✨ Features

- Documentation for the Component library.
- Test runner to automatically test your entire Storybook and catch broken stories.
- Unit tests for functionality
- End-to-end tests for simulating real user scenarios
- Visual tests capture a screenshot of every story and then compare it against baselines to detect appearance and integration issues
- Accessibility testing ensures that digital content and interfaces are usable and inclusive for all users, including those with disabilities.
- Interaction tests verify component functionality by simulating user behavior, firing events, and ensuring that the state is updated as expected
- Snapshot tests detect changes in the rendered markup to surface rendering errors or warnings
- Coverage tests to measure how much of your code is covered by your tests
- Storybook integrates with design tools to speed up your development workflow. 

**Table of contents:**
 - [Storybook Setup](#item-one)
 - [Test runner Setup](#item-two)

## Storybook Installation and Setup
<a id="item-one"></a>
### Storybook Setup
1. Install Storybook.

       npx storybook@latest init
    
2. Run Storybook.

       npm run storybook
   
<a id="item-two"></a>
### Test runner Setup
#### How it Works?
- The Storybook test runner uses Jest as a runner, and Playwright as a testing framework.
- Each one of your .stories files is transformed into a spec file, and each story becomes a test, which is run in a headless browser.
- The test runner is simple in design – it just visits each story from a running Storybook instance and makes sure the component is not failing.
- **Smoke test:** For stories without a play function, it verifies whether the story is rendered without any errors.
- **Interaction test:** For those with a play function, it also checks for errors in the play function and that all assertions passed.

1. Install test runner and playwright.

       npm install @storybook/test-runner --save-dev
       npx playwright install
3. Update your package.json scripts and enable the test runner.

        {
          "scripts": {
             "test-storybook": "test-storybook"
          }
        }
4. Start  Storybook with:

        npm run storybook
5. Run the test runner in a new terminal.

        npm run test-storybook
6. Generate Test Report.

       npm run test-storybook --junit

<a id="item-three"></a>
### Visual tests Setup
Visual Testing catches Visual bugs by capturing and comparing image snapshots in a real browser.
#### Chromatic
1. Sign up to Chromatic with your GitHub, GitLab, Bitbucket, or email and generate a unique <project-token> for your Storybook.
2. Install the chromatic CLI package.

        npm install chromatic --save-dev
3. Run the below command.

        npx chromatic --project-token <your-project-token>
        
<a id="item-three"></a>
### Accessibility tests
#### How it Works?
- Storybook's a11y addon runs Axe on the selected story.
- Axe, on average, finds 57% of WCAG issues automatically.

1. Install the addon.
    
        npm install @storybook/addon-a11y --save-dev
2. Update your Storybook configuration (in .storybook/main.ts) to include the accessibility addon.

        import type { StorybookConfig } from "@storybook/angular";
        const config: StorybookConfig = {
          framework: '@storybook/your-framework',
          stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
          addons: [
            // Other Storybook addons
            '@storybook/addon-a11y', //👈 The a11y addon goes here
          ],
        };
        export default config;

#### Automate accessibility tests with a test runner
1. Install the required dependencies.

        npm install axe-playwright --save-dev
2. Add a new configuration file (.storybook/test-runner.ts).

        // .storybook/test-runner.ts
        import { injectAxe, checkA11y } from 'axe-playwright';
        import type { TestRunnerConfig } from '@storybook/test-runner';
        /*
         * See https://storybook.js.org/docs/react/writing-tests/test-runner#test-hook-api-experimental
         * to learn more about the test-runner hooks API.
         */
        const a11yConfig: TestRunnerConfig = {
          async preRender(page) {
            await injectAxe(page);
          },
          async postRender(page) {
            await checkA11y(page, '#storybook-root', {
              detailedReport: true,
              detailedReportOptions: {
                html: true,
              },
            });
          },
        };
        module.exports = a11yConfig;

<a id="item-three"></a>
### Interaction tests
#### How it Works?
- Start by writing a story to set up the component's initial state. 
- Then simulate user behavior using the play function. 
- Finally, use the test-runner to confirm that the component renders correctly and that your interaction tests with the play function pass.

1. Install the required dependencies.

        npm install @storybook/testing-library @storybook/jest @storybook/addon-interactions --save-dev
2. Update your Storybook configuration (in .storybook/main.ts) to include the interactions addon.

        import type { StorybookConfig } from "@storybook/angular";
            const config: StorybookConfig = {
              framework: '@storybook/your-framework',
              stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
              addons: [
                // Other Storybook addons
                "@storybook/addon-interactions", //👈 The interactions addon goes here
              ],
            };
            export default config;

<a id="item-three"></a>
### Test coverage
Test coverage is the practice of measuring whether existing tests fully cover your code.

1. Install the coverage addon.
2. Update your Storybook configuration (in .storybook/main.ts) to include the coverage addon.
3. Components are instrumented using istanbul. Need to manually configure Istanbul.
4. Register it as part of Storybook's webpack config.
5. Start  Storybook with:
6. Run the test-runner in a new terminal.
7. Generate Test Report.
