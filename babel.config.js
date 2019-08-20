module.exports = function(api) {
  api.cache(true);
  const presets = [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage', // automatic emit package requirement
        corejs: 3, // using corejs3 dealing polyfill
        modules: false // using es module
      }
    ],
    [
      '@babel/react',
      {
        pramga: 'React.createElement',
        pragmaFrag: 'React.Fragment',
        throwIfNamespace: true
      }
    ]
  ];
  const plugins = [
    ['@babel/plugin-proposal-class-properties'],
    ['react-hot-loader/babel'] // react-hot-loader
  ];
  return {
    presets,
    plugins
  };
};
