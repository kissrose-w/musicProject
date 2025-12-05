import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

export default defineConfig({
  plugins: [uni()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://music.zyxcl.xyz',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') 
      }
    }
  }
});
