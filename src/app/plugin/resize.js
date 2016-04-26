var md = angular.module("resize", []);
md.provider("resize", resizeProvider);

function resizeProvider() {
    var last;
    this.$get = ["$rootScope", "$window", "$document", function ($rootScope, $window, $document) {

        $window.onresize = function () {
            $rootScope.$broadcast("resize", document.body.clientWidth);
        };
        $window.onscroll = document.body.onscroll = function () {
            $rootScope.$broadcast("scroll", document.body.clientWidth);

        };




        /*setInterval(function(){
         if(last!==document.body.clientWidth){

         trigger();
         }
         last=document.body.clientWidth;
         },100);
         var tiggerTimeout;
         function trigger(){
         clearTimeout(tiggerTimeout);
         tiggerTimeout=setTimeout(function(){
         $rootScope.$broadcast("resize",document.body.clientWidth);
         },300);
         }
         */
    }];
}

module.exports = md;