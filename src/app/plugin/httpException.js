/**
 * http拦截器
 * 处理response返回错误码处理
 * **/

var md=angular.module("httpException",[]);
md.provider("httpException",httpExceptionProvider);
md.config(["$httpProvider",httpConfig]);

function httpConfig($httpProvider){
    $httpProvider.interceptors.push('httpException');
}

function httpExceptionProvider(){
    this.$get=["$rootScope","$q",function($rootScope,$q){

        return {
            response:responseSuccess,
            responseError:responseError
        };
        function responseSuccess(resp){

            if(resp.data&&resp.data.code==10000){
                if(typeof(resp.data.data)=="string"){
                    resp.data=resp.data;
                }else{
                    resp.data=resp.data.data;
                }
                
            }else if(resp.data&&resp.data.code!=undefined&&resp.data.code!=10000){
                $rootScope.$broadcast("$httpException",{data:resp,status:resp.status});
                return $q.reject(resp);
            }
            return $q.all(resp);
        }
        function responseError(rejection){
            if(rejection.status!==200){
                $rootScope.$broadcast("$httpException",{data:rejection.data,status:rejection.status});
            }
            return $q.reject(rejection);
        }
    }];

}

module.exports=md;

