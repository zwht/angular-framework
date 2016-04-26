/**
* @module plugins
*/
var md=angular.module("menu", []);
md.provider("menu", menuProvider);
md.directive("menu", menuDirective);


function menuProvider() {

    menuProviderGet.$inject = ["$route", "$rootScope", "$parse", "$window", "$location","$routeParams","$anchorScroll"];
    var config = {};
    this.root = config;

    this.$get = menuProviderGet;
    /**
    * 读取Routeconfig里面所有定义了menu的配置，系统将其识别为菜单项
    *
    * @class menu(菜单)
    */
    function menuProviderGet($route, $rootScope, $parse, $window, $location,$routeParams,$anchorScroll) {

        $rootScope.$on("$locationChangeSuccess", onLocationChanged);

        var result={
            all: getAllMenu,
            find: findMenu,
            scroll:scroll,
            to: navMenu,
            refresh:refresh
        };
        return result;

        function scroll(id){
                $location.hash(id);
                $anchorScroll();
        }

        function refresh(){
            $location.reload();
        }

        function onLocationChanged(evt,newUrl,oldUrl) {
            var old=$location.absUrl();
            if(oldUrl){
                $location.$$parse(oldUrl);
            }
            var oldPath=$location.path();
            if(newUrl){
                $location.$$parse(newUrl);
            }
            
            var newPath=$location.path();

            $location.$$parse(old);
            
            var menuNew = getCurrentMenu(newPath);
            var menuOld=getCurrentMenu(oldPath);
            $rootScope.currentMenu=menuNew;
            
            $rootScope.prevMenu=menuOld;

            result.current=menuNew;
            result.prev=menuOld;
            $rootScope.$broadcast("$menuChange", menuNew,menuOld,newUrl,oldUrl);
            $rootScope.$$time=new Date().getTime();
            
        }

        //get current route.
        function getCurrentMenu(rt) {
            var routes = $route.routes, result = "";

            for(var  i in $route.routes){
                var route=$route.routes[i];
                if (route.regexp && route.regexp.test(rt)) {
                    result = route;
                    break;
                }
            }

            return getMenuObject(result);
        }

        function getMenuObject(route) {
            var obj = {};
            if (angular.isString(route.menu)) {
                obj.name = route.menu;
                obj.title = route.title;
                obj.regex = route.originalPath;
                obj.templateUrl = route.templateUrl;
                obj.controller = route.controller;
                obj=angular.extend(obj,route.extend);
                obj.level = 0;
                return obj;
            } else if (angular.isObject(route.menu)) {
                obj.name = route.menu.name;
                obj.title = route.menu.title || route.menu.name;
                obj.regex = route.originalPath;
                obj.level = route.menu.level || 0;
                obj.templateUrl = route.menu.templateUrl;
                obj.controller = route.menu.controller;
                obj=angular.extend(obj,route.extend);
                return obj;
            }
        }

        /** 
        * 获取所有的菜单项
        *
        *@method all 
        */
        function getAllMenu() {
            var result = [];
            var routes = $route.routes;
            angular.forEach(routes, function (route) {
                var obj = getMenuObject(route);
                if (obj) {
                    result.push(obj);
                }
            });

            return result.sort(function (first, second) {
                return first.level - second.level;
            });
        }

        /** 
        * 根据菜单名查找菜单项
        *
        *@method all 
        */
        function findMenu(name) {
            var result = "", menus = getAllMenu();
            angular.forEach(menus, function (menu) {
                if (menu.name == name) {
                    result = menu;
                    return false;
                }
            });
            return result;
        }

        /** 
        * 根据菜单名跳转到对应的页面
        *
        *@method to
        */
        function fillParameter(path, params) {
            var splits = path.split("/");
            var tmpResult = [];
            for (var i = 0, count = 0, current, firstChar; i < splits.length; i++) {
                current = splits[i];
                firstChar = current[0];
                if (firstChar == ":" && params.length > count) {
                    var value = params[count];
                    tmpResult.push(value);
                    count++;
                } else if (firstChar == ":" && params.length < count + 1) {
                    break;
                } else {
                    tmpResult.push(current);
                }
            }
            return tmpResult.join("/");
        }


        //navigate to page.
        function navMenu(config) {

            if (angular.isString(config)) {
                var configNew = {};
                configNew.name = config;
                configNew.params = Array.prototype.slice.call(arguments, 1);
                config = configNew;
            }
            var name = config.name, target = config.target, params = config.params;
            var path;
            var menuCurrent = findMenu(name);
            if (menuCurrent) {
                path = fillParameter(menuCurrent.regex, params);
            }
            if (target && path) {
                var root=$location.absUrl();
                var currentPath=$location.path();
                var newPath;
                root=root.substring(0,root.length-currentPath.length);
                newPath=root+path;
                //console&&console.log("open:" + newPath);
                $window.open(newPath, target); 

            } else if (path) {
                //console&&console.log("nav to:" + path);
                $location.path(path);

            }
        }

    }
}



menuDirective.$inject = ["menu", "$parse"];

function menuDirective(menu, $parse) {
    return {
        restrict: "A",
        link: linkFn
    };


    function linkFn($scope, $ele, $attr) {
        if (!$attr.menu) {
            return;
        }
        var contents = $attr.menu.split(",");

        var menuName, params = [], target;
        if (contents.length > 0) {

            $ele.on("click",function () {
                menuName = $parse(contents[0])($scope);
                params = contents.slice(1);
                angular.forEach(params, function (v, i) {
                    params[i] = $parse(v)($scope);
                });
                target = $attr.target;
                menu.to({name: menuName, params: params, target: target});
                $scope.$apply();
            });
        }
    }
}

module.exports=md;
