import type { NextConfig } from 'next';
import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const hapticsShim = path.join(__dirname, 'src/shims/expo-haptics.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  // Do not list `react-native` here: Next SWC cannot parse RN 0.81 Flow; Babel handles it below.
  transpilePackages: [
    'react-native-web',
    'react-native-safe-area-context',
    '@react-native-async-storage/async-storage',
    'react-native-reanimated',
    'react-native-worklets',
    'react-native-vector-icons', 
  ],
  webpack: (config) => {
    // Prefer platform builds (e.g. reanimated findHostInstance.web.js) over native RN internals.
    config.resolve.extensions = [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      ...(config.resolve.extensions ?? []),
    ];
    config.resolve.alias = {
      ...(config.resolve.alias as Record<string, string>),
      'react-native$': 'react-native-web',
      'expo-haptics': hapticsShim,
    };
    config.module.rules.push({
      test: /\.(ttf|otf|woff2?)$/,
      type: 'asset/resource',
    });
    // Run before default loaders so Flow/component syntax in RN + Reanimated is stripped.
    const rnRelatedModules =
      /node_modules\/(react-native|react-native-reanimated|@react-native\/virtualized-lists|react-native-vector-icons)\//;
    config.module.rules.unshift({
      test: /\.(js|jsx|ts|tsx)$/,
      include: rnRelatedModules,
      enforce: 'pre',
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['module:@react-native/babel-preset'],
          // Reanimated's Babel plugin wraps worklets; do not add worklets/plugin separately.
          plugins: ['react-native-reanimated/plugin'],
          cacheDirectory: true,
        },
      },
    });
    // Metro defines __DEV__; Reanimated / worklets reference it. Replace with a boolean at bundle time.
    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
      }),
    );
    return config;
  },
};

export default nextConfig;
