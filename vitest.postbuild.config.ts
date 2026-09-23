import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/post-build/**/*.{test,spec}.ts'],
  },
});
