const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
module.exports = function override(config, env) {
    config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],config,);
    config = rewireLess.withLoaderOptions({modifyVars: { "@primary-color": "#28282a", "@disabled-color":"#000","@box-shadow-base":"rgba(0, 0, 0, .05)"},javascriptEnabled: true,})(config, env);
    return config;
  };