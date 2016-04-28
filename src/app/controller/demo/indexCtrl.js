var md = require("../../module/demo");
md.controller("demoIndexCtrl", demoIndexCtrl);

demoIndexCtrl.$inject = ["$scope","$location"];
function demoIndexCtrl($scope,$location) {
    console.log("demoIndexCtrl");
    $scope.pageClass="dome_index"
    $scope.goTo=function(){
        $location.path("/404")
    }
}