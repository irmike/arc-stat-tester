import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**/*.{jsx,js}'],
      exclude: [
        'src/**/*.test.{jsx,js}',
        'src/main.jsx',
        'src/index.css',
      ],
    },
  },
});

