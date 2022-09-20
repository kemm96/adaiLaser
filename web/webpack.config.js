const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  	entry: './src/index.js',
  	output: {
    	path: path.resolve(__dirname, 'dist'),
    	filename: 'build.js',
  	},
  	resolve: {
		extensions: ['.js', '.jsx'],
	  	alias: {
			'@mui/styled-engine': '@mui/styled-engine-sc'
	  	},
	},
  	module: {
    	rules: [
      	{
        		test: /\.(js|jsx)$/,
        		exclude: /node_modules/,
        		use: {
          		loader: 'babel-loader'
        		}
      	},
      	{
        		test: /\.html$/,
        		use: [
          		{
            		loader: 'html-loader'
          		}
        		]
      	}
    	]
  	},
  	plugins: [
    	new htmlWebpackPlugin({
      	template: './public/index.html',
      	filename: './index.html'
    	}),
  	],
}