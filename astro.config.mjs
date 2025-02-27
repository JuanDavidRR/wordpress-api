// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import compress from "astro-compress";

// https://astro.build/config            
export default defineConfig({
    output: 'server',
    adapter: vercel(),
    integrations: [compress()],
    vite: {
        plugins: [tailwindcss()],
    },
});