module.exports = {
  root: true, // set current dir as root dir
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint', // @typescript-eslint/eslint-plugin
    'react', // eslint-plugin-react
    'react-hooks', // eslint-plugin-react-hooks
    'import', // eslint-plugin-import
    'jsx-a11y', // eslint-plugin-jsx-a11y
    'prettier' // eslint-plugin-prettier
  ],
  extends: [
    'eslint:recommended', // eslint recommended rules
    'plugin:@typescript-eslint/eslint-recommended', // @typescript-eslint/eslint-plugin in order to overlay eslint:recommended rules
    'plugin:@typescript-eslint/recommended', // @typescript-eslint/eslint-plugin recommended rules
    'plugin:react/recommended', // eslint-plugin-react recommended rules
    'plugin:import/recommended', // eslint-plugin-import recommended rules
    'plugin:import/typescript', // eslint-plugin-import typescript rules
    'plugin:jsx-a11y/recommended', // eslint-plugin-jsx-import recommended rules
    'prettier', // eslint-config-prettier rules in order to overlay eslint:recommmend rules
    'prettier/@typescript-eslint', // eslint-config-prettier rules in order to overlay @typescript-eslint/eslint-plugin rules
    'prettier/react' // eslint-config-prettier rules in order to overlay eslint-plugin-react rules
  ],
  rules: {
    'no-console': 'off', // allow console
    '@typescript-eslint/no-explicit-any': 'off', // allow any
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react-hooks/rules-of-hooks': 'error', // eslint-plugin-react-hooks recommended rules
    'react-hooks/exhaustive-deps': 'warn' // eslint-plugin-react-hooks recommended rules
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    commonjs: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2019,
    sourceType: 'module',
    useJSXTextNode: true,
    createDefaultProgram: false,
    extraFileExtensions: [],
    warnOnUnsupportedTypeScriptVersion: true
  },
  settings: {
    react: {
      createClass: 'createReactClass', // Regex for Component Factory to use,
      pragma: 'React', // Pragma to use, default to "React"
      version: 'detect' // React version. "detect" automatically picks the version you have installed.
    },
    propWrapperFunctions: [
      // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
      'forbidExtraProps',
      { property: 'freeze', object: 'Object' },
      { property: 'myFavoriteWrapper' }
    ],
    linkComponents: [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      'Hyperlink',
      { name: 'Link', linkAttribute: 'to' }
    ]
  }
};
