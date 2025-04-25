import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    exclude: ['@tanstack/react-router-devtools']
  }
}); 