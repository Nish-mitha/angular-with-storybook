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
 - [Visual tests Setup](#item-three)
 - [Accessibility tests](#item-four)
 - [Interaction tests](#item-five)
 - [Test coverage](#item-six)
 - [Snapshot tests](#item-seven)
 - [Import Stories in tests](#item-eight)
    - [End-to-end Testing](#item-eight-one)
    - [Unit Testing](#item-eight-two)
 - [Essential Addons](#item-nine)
    - [ViewPorts](#item-nine-one)
    - [Backgrounds](#item-nine-two)
 - [Design integrations](#item-ten)
    - [Figma](#item-ten-one)
       - [Embed Storybook in Figma with the plugin](#item-ten-one-a)
       - [Embed Figma in Storybook with the addon](#item-ten-one-b)

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
        
<a id="item-four"></a>
### Accessibility tests
#### How it Works?
- Storybook's a11y addon runs [Axe](https://github.com/dequelabs/axe-core) on the selected story.
- Axe, on average, finds 57% of [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) issues automatically.

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

<a id="item-five"></a>
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

<a id="item-six"></a>
### Test coverage
Test coverage is the practice of measuring whether existing tests fully cover your code.

1. Install the coverage addon.

        npm install @storybook/addon-coverage --save-dev
2. Update your Storybook configuration (in .storybook/main.ts) to include the coverage addon.

        import type { StorybookConfig } from "@storybook/angular";
        const config: StorybookConfig = {
          framework: '@storybook/your-framework',
          stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
          addons: [
            // Other Storybook addons
            "@storybook/addon-coverage", //👈 The coverage addon goes here
          ],
        };
        export default config;
3. Components are instrumented using [istanbul](https://istanbul.js.org/). Need to manually configure Istanbul.

        npm i @jsdevtools/coverage-istanbul-loader
4. Register it as part of Storybook's webpack config.

        import type { StorybookConfig } from "@storybook/angular";
        const config: StorybookConfig = {
          framework: '@storybook/your-framework',
          stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
          addons: [
            // Other Storybook addons
            "@storybook/addon-coverage", //👈 The coverage addon goes here
          ],
          framework: {
            name: "@storybook/angular",
            options: {},
            },
            docs: {
                autodocs: "tag",
            },
            webpackFinal(config, options) {
                const rules = config.module?.rules || []
                rules.push({
                test: /\.(js|ts)$/,
                loader: '@jsdevtools/coverage-istanbul-loader',
                enforce: 'post',
                include: [/\.(stories)\.ts$/]
                })
                config.module = config.module || {}
                config.module.rules = rules
                return config
            },
        };
        export default config;
5. Start  Storybook with:

        npm run storybook
6. Run the test-runner in a new terminal.

        npm run test-storybook --coverage
7. Generate Test Report.

        cp coverage/storybook/coverage-storybook.json coverage/coverage-storybook.json && nyc report --reporter=html -t coverage --report-dir coverage

<a id="item-seven"></a>
### Snapshot tests
#### How it Works?
- Snapshot tests work by recording some characteristic of a system (e.g., taking a snapshot), and then later comparing that stored snapshot to the current value of the characteristic.

1. Update the configuration file (.storybook/test-runner.ts).

        // .storybook/test-runner.ts
        import type { TestRunnerConfig } from '@storybook/test-runner';
        import { expect } from '@storybook/jest';
        const config: TestRunnerConfig = {
            /**
             * Snapshot Testing
             */
            const elementHandler = await page.$('#storybook-root');
            if(elementHandler) {
              const innerHTML = await elementHandler.innerHTML();
              expect(innerHTML).toMatchSnapshot();
            }
          },
        };
        module.exports = config;

<a id="item-eight"></a>
### Import Stories in tests
<a id="item-eight-one"></a>
#### End-to-end Testing
Simulate user interactions and verify the behavior of individual components within the Storybook environment using Testing tools like  [Cypress](https://www.cypress.io/) and [Playwright](https://playwright.dev/).
1. Installation.

        npm init playwright@latest
2. Running Tests.

        npx playwright test
3. Generate HTML Report.

        npx playwright show-report

<a id="item-eight-two"></a>
#### Unit Testing
- Stories are a practical starting point for UI Testing. Import stories into tools like Jest, Testing Library, Vitest, and Playwright, to save time and maintenance work.
- The storybook Testing Library for Angular is outdated and does not support the storybook7 version. So it's not possible to import stories to testing frameworks like Jest / Jasmine in Angular.
- Refer: [@storybook/testing-angular](https://storybook.js.org/addons/@storybook/testing-angular)
- But unit testing for a component can be written along with the stories.

<a id="item-nine"></a>
### Essential Addons
<a id="item-nine-one"></a>
#### Viewport
The Viewport toolbar item allows you to adjust the dimensions of the iframe your story is rendered in. It makes it easy to develop responsive UIs.

1. Install @storybook/addon-viewport.

        npm install @storybook/addon-viewport --save-dev
2. Update the preview.ts file.

        import type { Preview } from "@storybook/angular";
        import { INITIAL_VIEWPORTS }from "@storybook/addon-viewport";
        const preview: Preview = {
            parameters: {
                actions: { argTypesRegex: "^on[A-Z].*" },
                controls: {
                    matchers: {
                        color: /(background|color)$/i,
                        date: /Date$/i,
                    },
                },
                viewport: {
                    viewports: INITIAL_VIEWPORTS,
                },
            },
        };
        export default preview;

<a id="item-nine-two"></a>
#### Backgrounds
The backgrounds toolbar addon allows you to set the background color in which the story renders in the UI.

1. Configure your own set of colors with the parameters.backgrounds parameter in your .storybook/preview.ts

        import type { Preview } from "@storybook/angular";
        import { INITIAL_VIEWPORTS }from "@storybook/addon-viewport";
        const preview: Preview = {
            parameters: {
                actions: { argTypesRegex: "^on[A-Z].*" },
                controls: {
                    matchers: {
                        color: /(background|color)$/i,
                        date: /Date$/i,
                    },
                },
                viewport: {
                    viewports: INITIAL_VIEWPORTS,
                },
                backgrounds: {
                    default: 'light',
                    values: [
                      {
                        name: 'light',
                        value: '#ffffff',
                      },
                      {
                        name: 'dark',
                        value: '#000000',
                      },
                      {
                        name: 'grey',
                        value: '#636363',
                      },
                    ],
                },
            },
        };
        export default preview;

<a id="item-ten"></a>
### Design integrations
Storybook integrates with design tools to speed up your development workflow. That helps you debug inconsistencies earlier in the design process, discover existing components to reuse, and compare designs to stories.

<a id="item-ten-one"></a>
#### Figma
<a id="item-ten-one-a"></a>
##### Embed Storybook in Figma with the plugin
1. In Storybook
    - Sign in with Chromatic.
    - Go to a story in a Storybook that is published on Chromatic.
    - Copy the URL for the story from the address bar.
2. In Figma
    - Open a Figma file in Design or Dev Mode.
    - Run the Storybook plugin in Figma.
    - Select the Figma component you want to link the story to. The Storybook plugin supports linking stories to Figma components, variants, and instances.
    - Paste the URL into the plugin modal.
    - Click Link story.
    - Figma will show links to the story in the right sidebar. If a component was linked, all instances of that component will have the link.

<a id="item-ten-one-b"></a>
##### Embed Figma in Storybook with the addon
1. Install the @storybook/addon-designs addon.

        npm install --save-dev @storybook/addon-designs
2. Update your Storybook configuration (in .storybook/main.ts) to include the addon.

        import type { StorybookConfig } from "@storybook/angular";
        const config: StorybookConfig = {
            stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
            addons: [
                '@storybook/addon-designs'
            ],
            framework: {
                name: "@storybook/angular",
                options: {},
            },
            docs: {
                autodocs: "tag",
            },
        };
        export default config;
3. Link Figma components to stories
    Paste the Figma URL in Storybook. Use a parameter to associate Figma files and frames to your story.

        const meta: Meta<ButtonComponent> = {
            title: "Components/Button",
            component: ButtonComponent,
            parameters: {
                design: {
                    type: 'figma',
                    url: ""
                }
            },
        };
