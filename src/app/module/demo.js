var md=angular.module("web.demo",[]);

md.config(config);
config.$inject = ["$routeProvider"];
function config($routeProvider) {
    $routeProvider  
        .when("/demo",{templateUrl:"page/demo/index.html",controller:"demoIndexCtrl",menu:"demo.index"})
        .when("/demo/icon",{templateUrl:"page/demo/icon.html",controller:"demoIconCtrl",menu:"demo.icon"})
        .when("/demo/change01",{templateUrl:"page/demo/change01.html",controller:"pageChang01Ctrl",menu:"demo.change01"})
        .when("/demo/change02",{templateUrl:"page/demo/change02.html",controller:"pageChang02Ctrl",menu:"demo.change02"})
        .when("/demo/change03",{templateUrl:"page/demo/change03.html",controller:"pageChang03Ctrl",menu:"demo.change03"})

}

module.exports=md;