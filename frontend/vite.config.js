// import path from "path";
// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";

// export default defineConfig({
//   base: './', // ✅ ADD THIS LINE
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   });


// newone 

import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: './', // ✅ required so that assets load correctly in dist build
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist', // ✅ optional but makes it clear where build goes
    emptyOutDir: true, // clean the output folder before each build
  },
});
