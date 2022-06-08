import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
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
                /\.md$/, // .md
            ],
            imports: ['vue', 'vue-router'],
            dts: true,
            // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
            // 生成全局声明文件，给eslint用
            eslintrc: {
                enabled: true, // Default `false`
                filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
                globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
            },
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
            deep: true,
        }),
        createStyleImportPlugin({
            resolves: [ElementPlusResolve()],
        }),
        Icons({
            scale: 2, // Scale of icons against 1em
            defaultStyle: '', // Style apply to icons
            defaultClass: '', // Class names apply to icons
            compiler: 'vue3', // 'vue2', 'vue3', 'jsx'
            jsx: 'react', // 'react' or 'preact'
            autoInstall: true,
        }),
    ],
    server: {
        host: '0.0.0.0',
    },
})
