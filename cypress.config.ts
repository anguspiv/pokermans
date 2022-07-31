import { defineConfig } from 'cypress';
import plugins from './cypress/plugins';

export default defineConfig({
  projectId: 'r5i9ix',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return plugins(on, config);
    },
    baseUrl: 'http://localhost:3000/',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
});
