const path = require('path')
module.exports = { 
  mode: 'development',
	bundle: path.resolve(__dirname, 'src/index.js'),
	output: {
		path: path.resolve(__driname, 'dist'),
		filename: '[name].js'
	},
}