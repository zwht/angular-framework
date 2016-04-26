var md = require("../../module/demo");
md.controller("demoIconCtrl", demoIconCtrl);

demoIconCtrl.$inject = ["$scope"];
function demoIconCtrl($scope) {
	console.log("demoIconCtrl");
}