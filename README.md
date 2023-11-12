# [Storybook](https://storybook.js.org/docs/angular/get-started/why-storybook)

Storybook is a tool that helps you develop and showcase UI components in isolation. 
It provides a sandbox environment for each component, allowing you to view and interact with them independently of the rest of your application. 

## ✨Features

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
- Smoke test: For stories without a play function, it verifies whether the story is rendered without any errors.
- Interaction test: For those with a play function, it also checks for errors in the play function and that all assertions passed.
