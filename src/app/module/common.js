var md=angular.module("web.common",[]);

md.config(["$routeProvider",config]);

function config(route){
    route.when("/404",{templateUrl:"./page/common/404.html",controller:"c404Ctrl",menu:"common.404"});
}

module.exports=md;