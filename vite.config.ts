import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // This allows access to process.env.API_KEY in the browser
    // strictly for the purpose of this demo app.
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
});