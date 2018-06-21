var path = require("path");
var webpack = require("webpack");

module.exports = {
	entry: "./src/app.js",
	output: {
		path: path.resolve(__dirname, "output"),
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				test: /.js$/,
				exclude: path.resolve(__dirname, "node_modules"),
				loader: "babel-loader",
				options: {
					presets: ["react", "es2015"]
				}
			},
			{
				test: /\.css$/,
				loader: "style-loader!css-loader"
			}
		]
	},
	mode: "development",
	devtool: "source-map"
}