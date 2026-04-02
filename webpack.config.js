import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default {
  entry: './src/index.ts',
  output: {
    path: path.resolve(import.meta.dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin({ filename: 'styles.[contenthash].css' })
  ],
  devServer: {
    static: { directory: path.join(import.meta.dirname, 'dist') },
    port: 8080,
    open: true,
    hot: true
  },
  mode: 'development'
};