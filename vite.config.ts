import path from 'path'
const resolve = (dir: string) => path.join(__dirname, dir)

const config = {
    alias: {
        '/@/': resolve('example'),
        '/@src/': resolve('src'),
        'makeit-anchor': '/@src/index.ts',
        'makeit-anchor/style': '/@src/style.ts'
    },
    cssPreprocessOptions: {
        less: {
            javascriptEnabled: true
        }
    },
    optimizeDeps: {
        include: ['vue', '@ant-design/icons-vue']
    },
    proxy: {
        '/v1': {
            target: 'http://local-api.makeit.vip',
            changeOrigin: true
        }
    }
}
module.exports = config