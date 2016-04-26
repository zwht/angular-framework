var md=angular.module("web.main",[
    "ngRoute",
    "ngResource",
    "web.common",
    "web.demo",
    "httpException",
    "menu",
    "flag",
    "md5",
    "backTop",
    "loading",
    "query",
    "resize",
    "notifier",
    "dataExport",
    "routeAuthorize",
    "serverInject",
    "titleInject",
    "tokenInject",
    "dialog",
    "comment"
]);


/**
 *
 * **/
md.run(defaultRun);
defaultRun.$inject = ["$rootScope","$location","commonService","menu"];
function defaultRun($rootScope,$location,commonService,menu) {


    $rootScope.$on('$locationChangeStart',function(ev,p,n){
        //debugger;
    });

    //初始化回到顶部插件
    //backTop.init();
    //comment.init();
}



md.config(config);
config.$inject=["$routeProvider"];
function config($routeProvider) {

    $routeProvider
    //.when("/",{templateUrl:"./page/main/index.html",controller:"indexCtrl",})
        .when("/",{templateUrl:"./page/demo/index.html",controller:"demoIndexCtrl",menu:"index"})
        .otherwise({redirectTo: "404"});

}

module.exports=md;
