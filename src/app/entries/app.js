bulk=require('bulk-require');

bulk(__dirname, [
	'../controller/**/*.js',
	'../servers/**/*.js',
	'../plugin/**/*.js'
]);

//require("../module/main.js");

module.exports={};

