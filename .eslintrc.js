module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        // 'plugin:vue/essential',
        // 'standard'
        'alloy',
        'alloy/typescript',
        'vue-global-api',
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
    },
    plugins: ['vue', '@typescript-eslint'],
    rules: {
        indent: 0,
        'vue/html-indent': [
            'error',
            2,
            {
                attribute: 2,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: [],
            },
        ],
        'vue/multi-word-component-names': [
            'error',
            {
                ignores: ['Home'],
            },
        ],
        'vue/attribute-hyphenation': [
            'error',
            'always',
            {
                ignore: [],
            },
        ],
        'vue/first-attribute-linebreak': [
            'error',
            {
                singleline: 'ignore',
                multiline: 'beside',
            },
        ],
        'vue/attributes-order': [
            'error',
            {
                order: [
                    'DEFINITION',
                    'LIST_RENDERING',
                    'CONDITIONALS',
                    'RENDER_MODIFIERS',
                    'GLOBAL',
                    ['UNIQUE', 'SLOT'],
                    'TWO_WAY_BINDING',
                    'OTHER_DIRECTIVES',
                    'OTHER_ATTR',
                    'EVENTS',
                    'CONTENT',
                ],
                alphabetical: false,
            },
        ],
        'vue/component-api-style': [
            'error',
            ['script-setup', 'composition'], // "script-setup", "composition", "composition-vue2", or "options"
        ],
        'vue/define-macros-order': [
            'error',
            {
                order: ['defineProps', 'defineEmits'],
            },
        ],
        'vue/padding-line-between-blocks': ['error', 'always'],
        'vue/script-indent': [
            'error',
            4,
            {
                baseIndent: 1,
                switchCase: 0,
                ignores: [],
            },
        ],
        'vue/no-unused-vars': [
            'error',
            {
                ignorePattern: '^_',
            },
        ],
        // note you must disable the base rule as it can report incorrect errors
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        // 模板字符串 空格
        // 'template-curly-spacing': ['error', 'always'],
        // 链式调用换行
        // 'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
    },
}
