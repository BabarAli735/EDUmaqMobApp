module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@src/assets': './src/assets',
          '@src/data': './src/data',
          '@src/redux': './src/redux',
          '@src/actions': './src/redux/actions',
          '@src/selectors': './src/redux/selectors',
          '@src/router': './src/router',
          '@src/screens': './src/screens',
          '@src/utils': './src/utils',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
