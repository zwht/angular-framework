var md = require("../../module/common");
md.controller("c404Ctrl", c404Ctrl);

c404Ctrl.$inject = ["$scope"];
function c404Ctrl($scope) {
	console.log("c404Ctrl");
}