// .storybook/test-runner.ts

import { injectAxe, checkA11y } from 'axe-playwright';

import type { TestRunnerConfig } from '@storybook/test-runner';
import { expect } from '@storybook/jest';

const config: TestRunnerConfig = {
  async preRender(page) {
     await injectAxe(page);
   },
  async postRender(page) {
    /**
     * Automate accessibility tests with a test runner
     */
    await checkA11y(page, '#storybook-root', {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });

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