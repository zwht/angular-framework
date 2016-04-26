
var md=angular.module("routeAuthorize",[]);
md.provider("routeAuthorize",routeAuthorizeProvider);

function routeAuthorizeProvider(){
    this.$get=["$rootScope","$route","$location","session",function($rootScope,$route,$location,session){
        $rootScope.$on('$locationChangeStart',onBeforeChange);


        function onBeforeChange(ev,prev,next){

            debugger;
            var result=$rootScope.$broadcast("$nav",prev,next,doNav)

            if(result.defaultPrevented){
                ev.defaultPrevented=true;
            }
            function doNav(){
                window.location.href=next;
            }
        }

        $rootScope.$on('$locationChangeStart',onLocationChange);


        function onLocationChange(ev){
            var currentRole=session.get("accountType");
            var result=validate(currentRole);
            if(!result){
                //console&&console.log("authorize failed.");

            }else{
                //console&&console.log("authorize success.");
            }
           var eventResult= $rootScope.$broadcast('$authorize', result).defaultPrevented;
            if(eventResult){
                ev.preventDefault();
            }
        }

        //get current route roles
        function getRoles(){
            var result=[];
            var routes=$route.routes;
            angular.forEach(routes,function(route,path){
                if(route.regexp&&route.regexp.test($location.path())){
                    result=route.role;
                    return false;
                }
                
            });
            return angular.isArray(result)?result:[result];
        }

        function validate(currentRole){
            currentRole=currentRole||"anonymous";
            var roles=getRoles(),result=false;

            angular.forEach(roles,function(r){
                r=r||"anonymous";
                if(r=="anonymous"||r==currentRole){
                    result=true;
                    return false;
                }
            });
            return result;
        }
    }];
}

module.exports=md;
