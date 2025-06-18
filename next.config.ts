// next.config.js
const isProd = process.env.NODE_ENV === 'production';
const repoName = 'frontend'; 

module.exports = {
  output: 'export',
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
};