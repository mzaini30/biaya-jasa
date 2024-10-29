import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import UnoCSS from "unocss/vite";
import pages from "vite-plugin-pages-svelte";
import legacy from "@vitejs/plugin-legacy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), UnoCSS(), pages(), legacy()],
});
