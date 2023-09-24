const path = require('path');

const main = {
    '@components': path.resolve(__dirname, '../src/components'),
    '@ui': path.resolve(__dirname, '../src/components/ui'),
    '@skeleton': path.resolve(__dirname, '../src/components/skeleton'),
    '@features': path.resolve(__dirname, '../src/features'),
    '@utils': path.resolve(__dirname, '../src/utils'),
    '@store': path.resolve(__dirname, '../src/store'),
    '@hooks': path.resolve(__dirname, '../src/hooks'),
};

const styles = {
    '@styles': path.resolve(__dirname, '../src/styles'),
    '@static': path.resolve(__dirname, '../src/static'),
    '@icons': path.resolve(__dirname, '../src/static/icons'),
};

const types = {
    '@types': path.resolve(__dirname, '../src/types.ts'),
};

exports.main = main;
exports.styles = styles;
exports.types = types;
