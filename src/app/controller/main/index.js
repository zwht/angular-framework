var md = require("../../module/main");
md.controller("indexCtrl", indexCtrl);

indexCtrl.$inject = ["$scope","commonService"];
function indexCtrl($scope,commonService) {
	console.log("indexCtrl");
	commonService.classSearch.get({
			teacherId: "244445555555555"
		},
		function(datas) {
			//没有查询到年级
			console.log(datas);
		},
		function(err) {
		});
}