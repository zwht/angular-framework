var md=angular.module("serverInject",[]);


md.provider("serverInject",serverInject);
md.config(["$httpProvider",httpConfig]);


function transformRequest(obj) {
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}



function httpConfig($httpProvider){
    $httpProvider.interceptors.push('serverInject');
}

//保存服务器api地址
var server=""; 

function serverInject(){
    
    this.setServer=function(str){
            server=str;
    };
    this.$get=[getFn];
    function getFn(){
        return {
            getRoot:getRoot,
            request:onRequest
        };

        function getRoot(){
            return server;
        }

        function onRequest(config){

            if(config.form){
                config.transformRequest=transformRequest;
                config.headers=config.headers||{};
                config['Content-Type']='application/x-www-form-urlencoded';
            }
            //add timespan which disabled ie cache
            if(config.url.indexOf("rest")>-1){
                var timespan=new Date().getTime();
                config.url+=config.url.indexOf("?")==-1?("?t="+timespan):("&t="+timespan);
            }

            if(!config.server&&!/.*\.html$/.test(config.url)){
                config.url=server+config.url;
            }else if(config.server&&!/.*\.html$/.test(config.url)){
                config.url=config.server+config.url;
            }
            return config || $q.when(config);
        }
    }
}

module.exports=md;
