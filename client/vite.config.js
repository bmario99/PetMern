import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      REACT_APP_EMAILJS_SERVICE_ID: JSON.stringify(process.env.REACT_APP_EMAILJS_SERVICE_ID),
      REACT_APP_EMAILJS_TEMPLATE_ID: JSON.stringify(process.env.REACT_APP_EMAILJS_TEMPLATE_ID),
      REACT_APP_EMAILJS_PUBLIC_KEY: JSON.stringify(process.env.REACT_APP_EMAILJS_PUBLIC_KEY)
    }
  }
});


