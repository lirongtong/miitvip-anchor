import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import EslintPlugin from 'vite-plugin-eslint'
import path from 'path'
const resolve = (dir: string) => path.join(__dirname, dir)

export default defineConfig({
    resolve: {
        alias: {
            '@': resolve('example'),
            '@src': resolve('src'),
            'makeit-anchor': resolve('src'),
            'makeit-anchor/style': resolve('src/style.ts')
        }
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    optimizeDeps: {
        include: ['vue', '@ant-design/icons-vue']
    },
    server: {
        proxy: {
            '/v1': {
                target: 'http://local-api.makeit.vip',
                changeOrigin: true
            }
        }
    },
    plugins: [vue(), VueJsx(), EslintPlugin()],
    esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'Fragment'
    }
})