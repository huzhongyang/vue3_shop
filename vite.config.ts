import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],
      imports: ['vue', 'vue-router'],
      dts: true,
      // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
      // 生成全局声明文件，给eslint用
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      }
    }),
    Components({
      // 组件位置, 默认 src/components
      dirs: ['src/components'],
      // UI 库解析器
      resolvers: [ElementPlusResolver(), IconsResolver()],
      // 组件的有效文件扩展名
      extensions: ['vue'],
      // 配置文件生成位置
      dts: true,
      // 搜索子目录
      deep: true
    }),
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()]
    }),
    Icons({
      scale: 2, // Scale of icons against 1em
      defaultStyle: '', // Style apply to icons
      defaultClass: '', // Class names apply to icons
      compiler: 'vue3', // 'vue2', 'vue3', 'jsx'
      jsx: 'react', // 'react' or 'preact'
      autoInstall: true
    }),
    viteCompression({
      verbose: true,
      disable: false,
      // filter:()=>{}, // 那些资源不压缩
      threshold: 1024, // 体积大于 threshold 才会被压缩,单位 b
      deleteOriginFile: false,// 压缩后是否删除源文件
      algorithm: 'gzip', // 压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
      ext: '.gz' // 生成的压缩包后缀
    })
  ],
  server: {
    host: '0.0.0.0'
  },
  build: {
    emptyOutDir: true,
    outDir: 'dist',
    target: 'esnext',
    rollupOptions: {
      // 两种方式
      // 一，也可以指定包名打包
      // output: {
      //     manualChunks: {
      //         "vxe-table": ["vxe-table"],
      //         "echarts": ["echarts"],
      //         "xe-utils": ["xe-utils"],
      //         "lodash": ['lodash'],
      //         "ant-design-vue": ['ant-design-vue'],
      //         "@antv/g2plot": ['@antv/g2plot'],
      //         "@antv/g2": ['@antv/g2'],
      //     }
      // },
      // 二，自动分割包名输出 chunkSizeWarningLimit 配置大小
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/static/[name]-[hash].[ext]',
        manualChunks(id: any) {
          if (id.includes('node_modules')) {
            return id.toString()
                     .split('node_modules/')[1].split('/')[0].toString()
          }
        }
      }
    }
  }
})

export function configViteCompression() {
  // 开启压缩 [文档](https://github.com/anncwb/vite-plugin-compression/blob/main/README.zh_CN.md)
  return viteCompression({
    verbose: true,
    disable: false,
    // filter:()=>{}, // 那些资源不压缩
    threshold: 1024 * 50, // 体积大于 threshold 才会被压缩,单位 b
    deleteOriginFile: false,// 压缩后是否删除源文件
    algorithm: 'gzip', // 压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
    ext: '.gz' // 生成的压缩包后缀
  })
}
