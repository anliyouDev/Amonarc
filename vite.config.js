import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import contact from "./server/contact.js";

export default defineConfig({
  base: "/",
  server: { allowedHosts: ["terminal.local"] },
  plugins: [react(), {
    name: 'amonarc-contact-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.split('?')[0] === '/api/contact') return contact(req, res);
        next();
      });
    },
  }],
});
