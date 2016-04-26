var md = require("../module/common");
//最基本简单折线图在图表dome演示里有
md.directive("brokenLineChart", function () {
    var chart = "_chart_id_";
    var count = 0;
    return {
        restrict: 'A',
        replace: true,
        scope: {
            brokenLineChart: "="
        },
        link: function (scope, element) {


            count++;
            element.css({position: 'relative'});

            var child = angular.element("<div id=" + chart + count + "></div>").css({width: '100%', height: "100%"});
            element.append(child);

            var brokenLineChart = require("../../extends/chart/brokenLineChart");

            var config = {
                id: chart + count,
                data: scope.brokenLineChart,
                domain: [0, 120],
                margin: {top: 20, right: 20, bottom: 40, left: 40}
            };
            var line = new brokenLineChart(config);
            scope.$on("$destroy", function () {
                line.dispose();
            });
            scope.$on("resize", function () {
                line.dispose();
                line = new brokenLineChart(config);
            });
        }

    };
});

module.exports = md;