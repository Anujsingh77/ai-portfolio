import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Deploying to https://<username>.github.io/<repo>/  needs base = "/<repo>/"
// Deploying to a custom domain or https://<username>.github.io/ (user page) needs base = "/"
// Set it with an env var so nobody has to hand-edit this file on every deploy:
//   VITE_BASE_PATH=/portfolio/ npm run build
const base = "/ai-portfolio/";

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
