import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" works for GitHub Pages (user site or project site) and Vercel.
export default defineConfig({ plugins: [react()], base: "./" });
