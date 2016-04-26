var md=angular.module("web.demo",[]);

md.config(config);
config.$inject = ["$routeProvider"];
function config($routeProvider) {
    $routeProvider  
        .when("/demo",{templateUrl:"page/demo/index.html",controller:"demoIndexCtrl",menu:"demo.index"})
        .when("/demo/icon",{templateUrl:"page/demo/icon.html",controller:"demoIconCtrl",menu:"demo.icon"})

}

module.exports=md;