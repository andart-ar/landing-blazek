import type { StorybookConfig } from '@storybook/react-vite';
import { fileURLToPath } from 'node:url';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  staticDirs: ['../public'],
  framework: '@storybook/react-vite',
  viteFinal: async (viteConfig) => {
    viteConfig.resolve ??= {};
    viteConfig.resolve.alias = {
      ...viteConfig.resolve.alias,
      '@': fileURLToPath(new URL('../src', import.meta.url)),
    };
    viteConfig.optimizeDeps ??= {};
    viteConfig.optimizeDeps.include = [
      ...(viteConfig.optimizeDeps.include ?? []),
      'react',
      'react-dom',
      'react-dom/client',
      'react/jsx-runtime',
    ];
    return viteConfig;
  },
};

export default config;
