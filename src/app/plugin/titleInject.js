
var md=angular.module("titleInject",[]);
md.provider("routeInjectTitle",routeAuthorizeProvider);

function routeAuthorizeProvider(){
    var defaultTitle="";
    var prefix="SITE";
    this.setDefault=function(title){
        defaultTitle=title||defaultTitle;
    };
    this.setPrefix=function(value){
        prefix=value;
    };
    var titleTag=document.getElementsByTagName("title")[0];
    this.$get=["$route","$rootScope","$location","$window",function($route,$rootScope,$location, $window){

        $rootScope.$on("$locationChangeSuccess",onLocationChange);

        return {
            title:titleFunc
        };

        function titleFunc(value,usePrefix){
            if(value!==undefined){
                prefix=usePrefix===undefined?prefix:"";
                // angular.element("title").html(prefix+value);
                $window.document.title = prefix+title;
            }
        }

        function onLocationChange(){

            var title=getTitle();
            // titleTag.innerText=prefix+title;
            $window.document.title = prefix+title;
        }

        //get current route roles
        function getTitle(){
            var result=defaultTitle;
            var routes=$route.routes;
            debugger;
            angular.forEach(routes,function(route){
                if(route.regexp&&route.regexp.test($location.path())){
                    result=route.title||defaultTitle;
                    $rootScope.inportal=route.portal;
                    return false;
                }
            });
            return result;
        }

    }];
}

module.exports=md;