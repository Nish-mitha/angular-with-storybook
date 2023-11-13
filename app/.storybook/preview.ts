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