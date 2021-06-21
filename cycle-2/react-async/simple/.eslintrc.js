module.exports = {
    env: {
        es2021: true,
        node: true,
        browser: true
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        '@typescript-eslint/no-unused-vars': ['error']
    },
    ignorePatterns: ['node_modules'],
    settings: {
        react: {
            version: 'detect'
        }
    }
};
