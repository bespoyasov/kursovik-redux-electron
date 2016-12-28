var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var autoprefixer = require('autoprefixer');
var isProduction = process.env.NODE_ENV === 'production';


module.exports = [{
	context: path.resolve(__dirname, "client"),
	entry: {
		javascript: "./js/index.js",
		html: './index.html',
		css: './css/style.scss'
	},

	output: {
		filename: "./js/app.js",
		path: path.resolve(__dirname, "public"),
	},

	module: {
		loaders: [
			{
				test: /\.html$/,
				loader: "file?name=[name].[ext]",
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react', 'stage-2']
				}
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract(("style"), "css!postcss!sass")
			},
			{test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?mimetype=image/svg+xml&name=/fonts/[name].[ext]'},
      {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file?mimetype=application/font-woff&name=/fonts/[name].[ext]"},
      {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file?mimetype=application/font-woff&name=/fonts/[name].[ext]"},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file?mimetype=application/octet-stream&name=/fonts/[name].[ext]"},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=/fonts/[name].[ext]"},
			{test: /\.png$/, loader: "file?name=/img/[name].[ext]"},
			{test: /\.jpg$/, loader: "file?name=/img/[name].[ext]"},
		],
	},

	postcss: function() {
		return [autoprefixer];
	},

	plugins: isProduction ? [
		new ExtractTextPlugin('./css/style.css', {}),
		new OptimizeCssAssetsPlugin({
			cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: {removeAll: true } }
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				drop_console: true,
	    },
		})
	] : [
		new ExtractTextPlugin('./css/style.css', {})
	],

	devServer: {
    historyApiFallback: true
  }
}]
