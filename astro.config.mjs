// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel'; // ✅ Ensure server adapter is used
import tailwindcss from '@tailwindcss/vite';
import compress from "astro-compress";

// https://astro.build/config            
export default defineConfig({
    adapter: vercel(), // ✅ Vercel server mode
    output: "server",  // ✅ Forces SSR mode
    integrations: [compress()],
    vite: {
        plugins: [tailwindcss()],
    },
});
