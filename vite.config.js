import { defineConfig,loadEnv  } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
/*export default defineConfig({
  
  base: import.meta.env.VITE_SUBFOLDER,
  plugins: [vue()],
  build: {
    chunkSizeWarningLimit: 2600,
  },
  define: {
    'process.env': process.env
  }
})*/
export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
      plugins: [vue()],

      base: process.env.VITE_SUBFOLDER,
      build: {
        chunkSizeWarningLimit: 2600,
      },
      /*server: {
        port: 8080,
      },*/
  });
}

