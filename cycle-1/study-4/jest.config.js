module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    testRegex: '\\.test\\.ts$',
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'json'
    ],
    globals: {
        'ts-jest': {
            'diagnostics': true
        }
    }
};
