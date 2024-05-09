import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";
import envCompatible from "vite-plugin-env-compatible";
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: 'REACT_APP_',
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: "build",
  },
  plugins: [
    react(),
    envCompatible(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
  ],
  server: {
    watch: {
      usePolling: true,
    },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
});