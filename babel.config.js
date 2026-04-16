/** Next uses this instead of SWC when present — required so `react-native-reanimated/plugin` runs on app source (worklets). */
module.exports = {
  presets: ['next/babel'],
  plugins: ['react-native-reanimated/plugin'],
  /**
   * `next/babel` in dev applies JSX dev transforms that conflict with this package
   * ("Duplicate __self prop"). It is still compiled by babel-loader in `next.config.ts`
   * (RN preset + reanimated-safe path for node_modules).
   */
  ignore: [/node_modules[\\/]react-native-vector-icons[\\/]/],
};
