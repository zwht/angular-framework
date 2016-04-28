var md = require("../../module/demo");
md.controller("pageChang03Ctrl", pageChang03Ctrl);

pageChang03Ctrl.$inject = ["$scope","$location"];
function pageChang03Ctrl($scope,$location) {
    console.log("pageChang03Ctrl");
    $scope.pageClass="page_chang03";
}