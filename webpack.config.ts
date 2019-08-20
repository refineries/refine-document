import path from 'path';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCssAssetsWebpackPlugin from 'optimize-css-assets-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import TypescriptLoader from 'ts-loader';

const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';
const isEnvEnableSourceMap = process.env.ENABLE_SOURCE_MAP === 'true';

const configDevServer: webpackDevServer.Configuration = {
  host: 'localhost',
  port: 8080,
  open: true,
  compress: true,
  hot: true,
  historyApiFallback: true,
  overlay: {
    warnings: false,
    errors: true
  }
};

const config: webpack.Configuration = {
  mode: isEnvDevelopment ? 'development' : 'production',
  entry: {
    main: './src/index.tsx'
  },
  output: {
    filename: 'js/[name].[hash:6].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: configDevServer,
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.vue', '.json'],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [
          {
            loader: require.resolve('eslint-loader'),
            options: {
              cache: true,
              failOnError: true
            }
          }
        ]
      },
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true
            }
          },
          {
            loader: require.resolve('ts-loader'),
            options: {
              transpileOnly: false,
              happyPackMode: false,
              logInfoToStdOut: true
            } as TypescriptLoader.Options
          }
        ]
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [
          {
            loader: require.resolve('eslint-loader'),
            options: {
              cache: true,
              failOnError: true
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.s(c|a)ss?$/,
        use: [
          isEnvDevelopment
            ? {
                loader: require.resolve('style-loader'),
                options: {}
              }
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {}
              },
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 2,
              modules: {
                mode: 'local',
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                context: path.resolve(__dirname, 'src'),
                hashPrefix: 'refine'
              }
            }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {}
          },
          {
            loader: require.resolve('sass-loader'),
            options: {}
          }
        ]
      },
      {
        test: /\.css?$/,
        use: [
          isEnvDevelopment
            ? {
                loader: require.resolve('style-loader'),
                options: {}
              }
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {}
              },
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: {
                mode: 'local',
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                context: path.resolve(__dirname, 'src'),
                hashPrefix: 'refine'
              }
            }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {}
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|ttf)?$/,
        use: [
          {
            loader: require.resolve('file-loader'),
            options: {
              name: '[name].[contenthash:6].[ext]',
              outputPath: 'media',
              publicPath: 'media'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin() as webpack.Plugin, // delete folder dist
    new webpack.ProgressPlugin(), // show progress
    isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
    isEnvProduction &&
      new MiniCssExtractPlugin({
        filename: 'css/[name].[chunkhash:6].css',
        chunkFilename: 'css/[name].[chunkhash:6].css',
        ignoreOrder: false
      }), // extract css into files
    new CopyWebpackPlugin([
      {
        from: 'public',
        to: ''
      }
    ]), // copy folder public to folder dist
    new HtmlWebpackPlugin({
      title: 'React | Playground',
      template: path.resolve(__dirname, 'public/index.html'),
      filename: path.resolve(__dirname, 'dist/index.html'),
      favicon: 'public/favicon.ico'
    }), // inject css and js and resources into html
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    }) // size analysis
  ].filter(Boolean) as webpack.Plugin[],
  devtool: isEnvEnableSourceMap ? 'source-map' : undefined,
  optimization: {
    noEmitOnErrors: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        extractComments: false,
        terserOptions: {
          compress: true,
          mangle: true,
          output: {
            comments: false
          }
        }
      }),
      new OptimizeCssAssetsWebpackPlugin({}) // compress css
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/,
          name: 'vender'
        }
      },
      chunks: 'all',
      minChunks: 1,
      minSize: 30000,
      maxAsyncRequests: 5,
      maxInitialRequests: 3
    },
    runtimeChunk: {
      name: 'runtime' // extract the common webpack runtime code into a single file
    }
  },
  externals: isEnvProduction // using cdn external link in production mode
    ? {
        react: 'React',
        'react-dom': 'ReactDOM'
      }
    : undefined
};
export default config;
