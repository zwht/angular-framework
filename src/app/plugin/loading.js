
var md=angular.module("loading",[]);
md.provider("loading",loadingProvider);

function loadingProvider(){

    this.$get=["$rootScope","$location","flag",function($rootScope,$location,flag){

        var box=angular.element("<div class='no-select'></div>");
        var loadingEle=angular.element("<div><img src='assets/image/common/loading.gif' style='width:150px'></div>");
        box.append(loadingEle);
        var json={ height:"100%", width:"100%",top:0,left:0,position:"fixed","z-index":999,transition:"opacity 0.5s"};
        if(flag.ISOLD){
            json.filter="progid:DXImageTransform.Microsoft.gradient(startColorstr=#99FFFFFF, endColorstr=#99FFFFFF)";
        }else{
            json.background="#FFFFFF";
        }
        box.css(json);

        loadingEle.css({position:"fixed","left":"50%",top:"40%","margin-left":"-75px"});
        var root=angular.element(document.body).css("position","relative");

        $rootScope.$on("$locationChangeSuccess",onLocationChange);
        $rootScope.$on("loaded",function(){
            setTimeout(function(){
                box.remove();
            },200);
        });
        $rootScope.$on("loading",function(){

            root.append(box);
        });

        return {
            title:titleFunc
        };

        function titleFunc(value,usePrefix){
            if(value!==undefined){
                prefix=usePrefix===undefined?prefix:"";
                angular.element("title").html(prefix+value);
            }
        }

        function onLocationChange(){
            root.append(box);
        }

    }];
}

module.exports=md;