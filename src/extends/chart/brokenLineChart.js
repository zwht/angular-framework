/**
 * zrender扩展
 * @module zrender
 * @author zw (赵伟, 1512763623@qq.com)
 */
var zrender = require("./../zrender/zrender");
var Group = require('./../zrender/Group');
var Polyline = require("./../zrender/shape/Polyline");
var CircleShape = require('./../zrender/shape/Circle');
var RectangleShape = require('./../zrender/shape/Rectangle');

var Scale = require('./tool/Scale');
var Axis = require('./tool/Axis');

/**
 * 折线图
 * @class brokenLineChart（折线图）
 * @constructor
 * @example
 *      var config = {
                id: "chartId",
                data: scope.brokenLineChart,
                domain: [0, 120],
                margin: {top: 20, right: 20, bottom: 40, left: 40}
            };
 var brokenLineChart=new BrokenLineChart(config);
 *
 *
 */
function BrokenLineChart(config) {


    var div = document.getElementById(config.id);
    var data = config.data;
    var margin = config.margin;

    //创建tab标签
    var tab = document.createElement("div");
    tab.className = "tab";
    tab.onmouseover = function () {
        this.style.display = "block";
    };

    if(div.parentNode.childNodes[1]) div.parentNode.childNodes[1].remove();
    div.parentNode.appendChild(tab);

    //初始化margin
    var width = (config.width ? config.width : parseInt(div.offsetWidth)) - margin.left - margin.right,
        height = (config.height ? config.height : parseInt(div.offsetHeight)) - margin.bottom - margin.top;


    //初始化zrender对象
    var zr = zrender.init(div);

    //初始化坐标尺
    var scaleY = new Scale()
        .setDomain(config.domain)
        .setRange([height, 0]);
    var scaleX = new Scale()
        .setDomain(data.length)
        .setRange([0, width]);



    //data数据初始化
    var i = 0, arr = [], polyLineArr = [];
    for (i = 0; i < data.length; i++) {
        var ls = [];
        arr[i] = data[i].name;

        ls[0] = scaleX.getRange(i + 0.5);
        ls[1] = scaleY.getRange(data[i].coore);

        polyLineArr.push(ls);
    }


    //创建XY坐标
    var axisY = new Axis().createY(10, scaleY);
    var axisX = new Axis().createX(arr, scaleX);
    axisY.position = [margin.left, margin.top];
    axisX.position = [margin.left, margin.top + height];


    //创建折线
    var polyLine = new Polyline({
        style: {
            pointList: polyLineArr,
            strokeColor: 'rgba(150,190,90,0.9)',   // == color
            lineWidth: 2,
            lineCap: 'round',
            lineType: 'solid',
            lineJoin: 'round',
            miterLimit: 50,
            shadowBlur: 10,
            shadowColor: "rgba(150,190,90,1)",
            textPosition: 'end'
        },
        hoverable: false
    });
    polyLine.position = [margin.left, margin.top];

    //创建数据点
    var circleGroup = new Group();
    var rectGroup = new Group();
    for (i = 0; i < polyLineArr.length; i++) {

        circleGroup.addChild(new CircleShape({
            style: {
                x: polyLineArr[i][0],
                y: polyLineArr[i][1],
                r: 6,
                color: 'rgba(255, 206, 250, 1)'
            },
            hoverable: false
        }));

        //创建隐藏的矩形
        var rect = new RectangleShape({
            style: {
                x: scaleX.getRange(i),
                y: 0,
                width: scaleX.getRange(1),
                height: height,
                color: 'rgba(255, 255, 255, 0)'
            },
            hoverable: false,
            onmouseover: function () {

                if (this.data[2]) {
                    var top = margin.top + this.data[1];
                    var left = margin.left + this.data[0];
                    tab.style.display = 'block';
                    if (this.data[1] + tab.offsetHeight > height) top -= tab.offsetHeight;
                    if (this.data[0] + tab.offsetWidth > width) left -= tab.offsetWidth;
                    tab.style.top = top + "px";
                    tab.style.left = left + "px";
                    this.data[2] = 0;
                }
            },
            onmouseout: function () {
                tab.style.display = 'none';

                this.data[2] = 1;
            }
        });
        polyLineArr[i][2] = 1;
        rect.data = polyLineArr[i];

        rectGroup.addChild(rect);


    }
    circleGroup.position = [margin.left, margin.top];
    rectGroup.position = [margin.left, margin.top];


    zr.addGroup(axisY);
    zr.addGroup(axisX);
    zr.addGroup(polyLine);
    zr.addGroup(circleGroup);
    zr.addGroup(rectGroup);

    return zr;


}

module.exports = BrokenLineChart;