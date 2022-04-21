const path = require('path');

/** @type {import('next').NextConfig} */
const config = {};

config.reactStrictMode = true;

config.resolve = {
  alias: {
    'graphql-upload': path.join(__dirname, 'node_modules/graphql-upload/dist/graphql-upload.umd.js'),
  },
};

console.log(config);

module.exports = config;
