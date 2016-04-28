var md = require("../../module/demo");
md.controller("pageChang02Ctrl", pageChang02Ctrl);

pageChang02Ctrl.$inject = ["$scope","$location"];
function pageChang02Ctrl($scope,$location) {
    console.log("pageChang02Ctrl");
    $scope.pageClass="page_chang02";
}