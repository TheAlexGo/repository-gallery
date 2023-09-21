const path = require('path');

const main = {
    '@components': path.resolve(__dirname, '../src/components'),
    '@features': path.resolve(__dirname, '../src/features'),
    '@utils': path.resolve(__dirname, '../src/utils'),
};

const styles = {
    '@styles': path.resolve(__dirname, '../src/styles'),
    '@static': path.resolve(__dirname, '../src/static'),
    '@images': path.resolve(__dirname, '../src/static/images'),
    '@icons': path.resolve(__dirname, '../src/static/icons'),
    '@fonts': path.resolve(__dirname, '../src/static/fonts'),
};

const types = {
    '@types': path.resolve(__dirname, '../src/types.ts'),
};

exports.main = main;
exports.styles = styles;
exports.types = types;
