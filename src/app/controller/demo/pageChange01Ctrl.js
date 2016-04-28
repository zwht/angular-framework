var md = require("../../module/demo");
md.controller("pageChang01Ctrl", pageChang01Ctrl);

pageChang01Ctrl.$inject = ["$scope","$location"];
function pageChang01Ctrl($scope,$location) {
    console.log("pageChang01Ctrl");
    $scope.pageClass="page_chang01";
}