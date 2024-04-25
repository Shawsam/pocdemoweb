import { createHtmlPlugin } from 'vite-plugin-html'
import { fileURLToPath, URL } from 'node:url'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    base: env.VITE_CDN,
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/head', '@vueuse/core'],
        dts: 'src/auto-import.d.ts',
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      visualizer({
        emitFile: true,
        filename: 'report.html', //分析图生成的文件名
        open: true //如果存在本地服务端口，将在打包后自动展示
      }),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            injectScript:
              env.VITE_ENV == 'production'
                ? '<script type="moudle" src="./src/utils/baidu.js"></script>'
                : '<script type="module" src="./src/utils/console.js"></script>'
          }
        }
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    //在build属性配置
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          //关闭打印信息
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    server: {
      proxy: {
        '/api': {
          // target: "https://u-playletweb.tarsocial.com/api",
          // target: "http://10.8.0.104:20066",
          target: 'https://t-apioverseaspocdemo.tarsocial.com',
          // target: "http://192.168.81.15:20066",
          // target: "http://10.8.0.165:20066",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '') // 不可以省略rewrite
        },

        '/avatar-api': {
          target: 'http://101.36.102.139',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/avatar-api/, '') // 不可以省略rewrite
        }
      }
    }
  })
}
