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
        target: 'https://music.zyxcl.xyz',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});




			// https://zyxcl.github.io/MusicApp/static/icon/faxian.png
			// https://zyxcl.github.io/MusicApp/static/icon/faxian_1.png

			// https://zyxcl.github.io/MusicApp/static/icon/wode.png
			// https://zyxcl.github.io/MusicApp/static/icon/wode_1.png
