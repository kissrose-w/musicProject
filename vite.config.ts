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
        // http://10.55.6.70:5001/
        // https://music.zyxcl.xyz
        target: 'http://39.96.210.90:5001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') 
      }
    }
  }
});
