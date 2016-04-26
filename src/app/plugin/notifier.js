var md=angular.module("notifier",[]);

md.provider("notifier",Notifier);



function Notifier(){

    this.$get=["$rootScope",function($rootScope){

        var box=angular.element("<div class='notifier'></div>");

        

        var css={position:"fixed",right:"0",bottom:"0"};
        var contentCss={}

        box.css(css);
        

        angular.element(document.body).append(box);

        $rootScope.$on("notify",function(evt,v){
            var content=angular.element("<div style='position:relative;bottom:-40px;'></div>");
            content.css(contentCss);
            if(v){
                content.html(v);
                box.append(content);
                
                setTimeout(function(){
                    content.addClass("item");
                },300)
                content.on("click",function(evt){
                    content.addClass("remove")
                    setTimeout(function(){
                        content.remove();
                    },300)
                    
                })
            }
            setTimeout(function(){
                    content.addClass("remove")
                    setTimeout(function(){
                        content.remove();
                    },500)
            },3000);
        })
        return {};

    }];

}