const webpack = require('webpack');

module.exports = {
	entry: "./game.tsx",
	output: {
		filename: "./game.js"
	},
	resolve: {
		// Add '.ts' and '.tsx' as a resolvable extension.
		extensions: [ ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
	},
	module: {
		loaders: [
			// all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
			{ test: /\.tsx?$/, loader: "ts-loader" }
		]
	},
	plugins: [
		new webpack.WatchIgnorePlugin([
			/\.js$/,
			/\.d\.ts$/
		])
	]
}


// const path = require('path');

// module.exports = {
// 	entry: './src/script/game/main.ts',
// 	module: {
// 		rules: [
// 			{
// 				test: /\.tsx?$/,
// 				use: 'ts-loader',
// 				exclude: /node_modules/
// 			}
// 		]
// 	},
// 	resolve: {
// 		extensions: ['.tsx', '.ts', '.js']
// 	},
// 	output: {
// 		filename: 'bundle.js',
// 		path: path.resolve(__dirname, './build/script/game/')
// 	}
// };
