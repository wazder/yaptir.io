import { defineConfig } from 'vite'

export default defineConfig({
    base: '/',
    server: {
        port: 3001,
        host: '0.0.0.0',
        open: true
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets'
    }
})
