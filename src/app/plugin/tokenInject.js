var md=angular.module("tokenInject",[]);
md.provider("tokenInject",tokenInjectProvider);
md.config(["$httpProvider",httpConfig]);

httpConfig.$inject=["$httpProvider"];
function httpConfig($httpProvider){
    //$httpProvider.interceptors.push('tokenInject');
}

function transformRequest(obj) {
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
};

function tokenInjectProvider(){
    var tokenKey="token"; //
    var from="cookie"; //from cookie,element,rootScope
    this.$get=["$q","$rootScope","session",function($q,$rootScope,session){
        return {
            request:onRequest
        };

        function onRequest(config){
            var token;

            if(config&&config.form){
                config.headers["Content-Type"]="application/x-www-form-urlencoded";
                //config.transformRequest=transformRequest;
            }

            if(config&&config.headers){
                if(from=="element"){
                    token=angular.element("#"+tokenKey).html();
                }else if(from=="scope"){
                    token=$rootScope[tokenKey];
                }else{
                    token = session.get(tokenKey);
                }
                config.headers.access_token=token;
            }
            return config || $q.when(config);

        }
    }];

}

module.exports=md;
