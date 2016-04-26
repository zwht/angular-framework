/**
 * @ngdoc module
 * @name backTop
 * @description
 * # backTop
 * 页面滚动一定距离，显示回到顶部按钮
 *
 * ## Example
 *backTop.init();
 */
var md = angular.module("backTop", []);
md.provider("backTop", backTop);

function isTouchDevice() {
    return /ANDROID|WEBOS|IPHONE|IPAD|IPOD|BLACKBERRY|IEMOBILE|OPERA MINI|NOKIA/i.test(window.navigator.userAgent.toUpperCase());
}

function backTop() {
    this.$get = ["$rootScope", "$timeout", function($rootScope, $timeout) {

        var img = angular.element("<img src='../../assets/image/common/rocket.png'/>");
        var img1 = angular.element("<img class='img1' src='../../assets/image/common/rocket.gif'/>");
        var oTop = angular.element("<div id='backTop'></div>");
        var root = angular.element(document.body).css("position", "relative");


        var createBackTop = {};
        createBackTop.init = function() {
            //判断页面是否有id为backTop的标签，是就删除掉
            if (document.getElementById("backTop")) document.getElementById("backTop").remove();

            oTop.append(img);
            oTop.append(img1);
            root.append(oTop);

            var windowWidth = document.body.clientWidth || window.innerWidth;
            //底部高度
            var marginBottom = 30;
            if (windowWidth < 768) marginBottom = 35;
            oTop.css({
                bottom: marginBottom + "px"
            });

            $rootScope.$on("scroll", pageScroll);

            function pageScroll() {
                var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
                oTop.css({
                    bottom: marginBottom + "px"
                });
                if (scrolltop > 400) {
                    oTop.css({
                        display: "block"
                    });
                } else {
                    oTop.css({
                        display: "none"
                    });
                }
            }


            var c = 1,
                bottom = marginBottom;
            oTop[0].onclick = function() {
                var screenh = (document.documentElement.clientHeight || document.body.clientHeight) - 100;
                img.css({
                    display: "none"
                });
                img1.css({
                    display: "block"
                });

                // this.style.bottom = bottom + 400 + 'px';
                // this.style.opacity = 0;

                // $timeout(function() {
                //     oTop.css({display: "none"});
                //     document.documentElement.scrollTop = 0;
                //     document.body.scrollTop = 0;
                //     img.css({display: "block"});
                //     img1.css({display: "none"});
                //     oTop[0].style.opacity = 1;
                // }, 300);

                var time = setInterval(function() {
                    bottom += c;
                    c += 10;
                    oTop.css({
                        bottom: bottom + "px"
                    });
                    // alert(screenh + ':' + bottom);
                    if (screenh < bottom) {
                        clearInterval(time);
                        oTop.css({
                            display: "none"
                        });
                        document.documentElement.scrollTop = document.body.scrollTop = 0;
                        img.css({
                            display: "block"
                        });
                        img1.css({
                            display: "none"
                        });
                        c = 1;
                        bottom = marginBottom;
                    }
                }, 41);
            };
            if (!isTouchDevice) {
                oTop[0].onmouseover = function() {
                    img.css({
                        display: "none"
                    });
                    img1.css({
                        display: "block"
                    });
                };
                oTop[0].onmouseout = function() {
                    img.css({
                        display: "block"
                    });
                    img1.css({
                        display: "none"
                    });
                };
            }

        };
        return createBackTop;
    }];
}