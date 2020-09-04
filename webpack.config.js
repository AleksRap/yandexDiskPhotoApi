const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const ImageminPlugin = require('imagemin-webpack');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',                                                // Нужна при нескольких точках входа. Позволяет не грузить общий код в каждый бандл, а выносить его в отдельные файлы
    },
  };

  if (isProd) {
    config.minimizer = [                                            // В режиме прода минифицируем css
      new OptimizeCssAssetsPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  return config;
};

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hrm: isDev,
        reloadAll: true,
      },
    },
    'css-loader',
  ];

  extra && loaders.push(extra);

  return loaders;
};

const jsLoader = () => {
  const loader = [{
    loader: 'babel-loader',
  }];

  return loader;
};

const filename = (ext) => isDev
  ? `[name].${ext}`
  : `[name].[hash].${ext}`;                                         // [name] - имя ключа === имя файла после сборки, [hash] - уникальный хэш для файла

const plugins = () => {
  const base = [                                                    // Плагины. Это классы расширяющие функционал вебпака. Всегда объявляются через new
    new HTMLWebpackPlugin({                                 // Для создания index.html в папке прода с указанием путей до подключенных скриптов
      template: './index.html',                                     // Указывает какой файл применять как шаблон
      minify: {
        collapseWhitespace: isProd,                                 // Минификация html, только в режиме продакшена
      },
    }),
    new CleanWebpackPlugin(),                                       // Чистит папку прода при пересборке
    new CopyWebpackPlugin({                                 // Для переноса файлов в папку прода. Для каждого файла/папки создается свой объект
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/favicon.ico'),
          to: path.resolve(__dirname, 'public'),
        },
      ],
    }),
    new MiniCssExtractPlugin({                              // Вынос стилей в отдельный файл
      filename: filename('css'),                                // Имя этого файла
    }),
  ];

  return base;
};

const fileLoaders = () => {
  const loaders = ['file-loader'];
  isProd && loaders.push({
    loader: ImageminPlugin.loader,
    options: {
      bail: false,
      cache: false,
      imageminOptions: {
        plugins: [
          ['pngquant', {quality: [0.5, 0.5]}],
          ['mozjpeg', {quality: 75, progressive: true}],
          ['gifsicle', {interlaced: true}],
          [
            'svgo',
            {
              plugins: [{
                removeViewBox: false,
              }],
            },
          ],
        ],
      },
    },
  });

  return loaders;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),                          // Контекст для всех урлов в настройках
  mode: 'development',                                              // Режим сборки 'development' и 'production'
  entry: {                                                          // Точки входа
    main: ['@babel/polyfill', './index.js'],
  },
  output: {                                                         // Выгрузка бандла
    filename: filename('js'),                                   // Имена файлов
    path: path.resolve(__dirname, 'public'),                        // Путь до папки выгрузки
  },
  resolve: {
    extensions: ['.js', '.ts', '.json'],                            // Расширения, которые можно не указывать в импортах
    alias: {                                                        // Алиасы, для упрощенного доступа к указанным путям. Вместо ../../../.. и т.д
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core'),
      '@modules': path.resolve(__dirname, 'src/modules'),
    },
  },
  optimization: optimization(),
  devServer: {                                                      // Локальный сервер. Нужен для обновления изменений в режиме реального времени
    port: 4200,                                                     // Порт для запуска локального сервера
    hot: isDev,
    hotOnly: false,
    liveReload: isDev,
    watchContentBase: true,
  },
  devtool: isDev ? 'source-map' : '',                               // Создаем исходные карты, чтобы видеть код до компиляции babel'ом
  plugins: plugins(),
  module: {                                                         // Модули. Позволяют работать с различными типами файлов
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: fileLoaders(),
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader'],
      },
      {
        test: /\.xml$/,
        use: ['xml-loader'],
      },
      {
        test: /\.csv$/,
        use: ['csv-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: jsLoader(),
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: jsLoader(),
      },
    ],
  },
};
