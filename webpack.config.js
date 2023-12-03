const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");

module.exports = {
  mode: "development", // или 'production'
  entry: path.join(__dirname, "src", "index.js"), // ваши основные файлы
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      // {
      //     test: /\.scss$/,
      //     use: ['style-loader', 'css-loader', 'sass-loader'],
      //   },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images",
            },
          },
          "image-webpack-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"), // ваш шаблон HTML
      filename: "index.html",
    }),
    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ["dist"],
        },
      },
    }),
  ],
  devServer: {
    watchFiles: path.join(__dirname, "src"),
    port: 9000,
  },
};
