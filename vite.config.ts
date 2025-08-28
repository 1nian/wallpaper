import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

// https://vitejs.dev/config/
export default defineConfig({
    css: {
        preprocessorOptions: {
            scss: {
                api: "modern",
            },
        },
    },
    plugins: [uni()],
    resolve: {
        alias: {
            "@": "/src",
        },
    },
});
