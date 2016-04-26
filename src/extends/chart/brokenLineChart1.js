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
var LineShape = require('./../zrender/shape/Line');
var TextShape = require('./../zrender/shape/Text');
var ImageShape = require('./../zrender/shape/Image');
var zrColor = require('./../zrender/tool/color');


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
    var div = config.element;
    var data = config.data;
    var length = data.length;
    var margin = config.margin;


    //初始化margin
    var width = (config.width ? config.width : parseInt(div.clientWidth || div.offsetWidth)) - margin.left - margin.right,
        height = (config.height ? config.height : parseInt(div.offsetHeight)) - margin.bottom - margin.top;

    var proportion = width / 770;
    var oneWidth = width / length;
    if (proportion > 1.3) proportion = 1.3;


    //初始化zrender对象
    var zr = zrender.init(div);

    //初始化坐标尺
    var scaleY = new Scale()
        .setDomain([0, 1])
        .setRange([0, height]);
    var scaleY2 = new Scale()
        .setDomain([100, 0])
        .setRange([0, height]);

    var scaleX = new Scale()
        .setDomain(length)
        .setRange([0, width]);


    //data数据初始化
    var i = 0, j = 0, arr = [], polyLineArr = [];
    var polyLineArr1 = [], polyLineArr2 = [];
    var lineagArry = [];
    for (i = 0; i < length; i++) {

        //处理画折线短需要的数据
        var ls = [], ls1 = [];
        arr[i] = data[i].name;

        ls1[0] = ls[0] = scaleX.getRange(i + 0.5);
        ls1[1] = ls[1] = scaleY2.getRange(data[i].score);

        if (ls1[1] === "参数不在定义域内") {
            polyLineArr1.push(polyLineArr2);
            polyLineArr2 = [];

            polyLineArr2 = [];
            ls1[1] = ls[1] = scaleY2.getRange(10);
            ls1[2] = ls[2] = "作业没交";
            polyLineArr2.push(ls1);

            polyLineArr1.push(polyLineArr2);
            polyLineArr2 = [];
        } else {
            polyLineArr2.push(ls1);
            if (i === length - 1) {
                polyLineArr1.push(polyLineArr2);
            }
        }
        polyLineArr.push(ls);


        //处理渐变需要的数组
        var newArr = [];
        newArr.push(i / (length - 1));
        if(length===1) newArr[0]=0;

        if (0 <= data[i].score && 60 > data[i].score) {
            newArr.push("#bb4f4f");
        } else if (60 <= data[i].score && 80 > data[i].score) {
            newArr.push("#f68f51");
        } else if (80 <= data[i].score && 90 > data[i].score) {
            newArr.push("#01addf");
        } else {
            newArr.push("#6abb4f");
        }
        lineagArry.push(newArr);

    }



    //创建矩形组
    var rectGroup = new Group();
    var ar = [0, 0.1, 0.2, 0.4];
    var ar1 = [0.1, 0.1, 0.2, 0.6];
    var colorS = ["#ebf4e9", "#e1f2f7", "#faeee6", "#f4e9e9"];
    for (i = 0; i < ar.length; i++) {
        var sY;
        sY = scaleY.getRange(ar[i]);

        rectGroup.addChild(new RectangleShape({
            style: {
                x: 0,
                y: sY,
                width: width,
                height: scaleY.getRange(ar1[i]),
                color: colorS[i]
            },
            hoverable: false
        }));
    }
    rectGroup.position = [margin.left, margin.top];
    var jgx = new LineShape({
        style: {
            xStart: 0,
            yStart: scaleY.getRange(ar[3]),
            xEnd: width,
            yEnd: scaleY.getRange(ar[3]),
            strokeColor: "#e9caca",
            lineWidth: 1,
            lineType: 'solid'
        }
    });
    jgx.position = [margin.left, margin.top];



    //折线渐变生成，ie8颜色为#ba9941;
    var linearG = "#ba9941";
    if (!config.ie) linearG = zrColor.getLinearGradient(
        (oneWidth/2), 0, width-oneWidth/2, 0, lineagArry);


    //创建折线
    var poluLineGroup = new Group();

    for (i = 0; i < polyLineArr1.length; i++) {
        var polyLine = new Polyline({
            style: {
                pointList: polyLineArr1[i],
                strokeColor: linearG,
                lineWidth: 5 * proportion,
                lineCap: 'round',
                lineType: 'solid',
                lineJoin: 'round',
                miterLimit: 50
            },
            hoverable: false
        });
        polyLine.position = [margin.left, margin.top];
        poluLineGroup.addChild(polyLine);
    }


    //创建X坐标
    var axisGroupX = new Group();
    //创建数据点和点到坐标x的线
    var circleGroup = new Group();
    for (i = 0; i < length; i++) {

        //创建X坐标
        axisGroupX.addChild(new TextShape({
            style: {
                x: scaleX.getRange(i + 0.5),
                y: 20,
                textAlign: 'center',
                color: 'rgba(0, 0, 0, 1)',
                text: data[i].name,
                textFont: '12px 微软雅黑'
            },
            hoverable: false
        }));

        var colorD = "#e9caca";
        var src = "../assets/image/ionic/ico_ylzc";
        if (width > 700) src = "../assets/image/ionic/ico_ylzc0";
        if (60 <= data[i].score && data[i].score < 80) {
            colorD = "#f5d4c5";
            src += "2";
        } else if (80 <= data[i].score && data[i].score < 90) {
            colorD = "#c4dde7";
            src += "1";
        } else if (90 <= data[i].score && data[i].score <= 100) {
            colorD = "#d9e0ca";
            src += "0";
        } else {
            src += "3";
        }

        var t = data[i].score + "%", tC = "#000", tX = polyLineArr[i][0], tY = polyLineArr[i][1] - 20;
        if (polyLineArr[i][2]) {
            t = polyLineArr[i][2];
            tC = "#bb4f4f";
            tY += 40;
        } else {
            //点到坐标x的线
            circleGroup.addChild(new LineShape({

                style: {
                    xStart: polyLineArr[i][0],
                    yStart: polyLineArr[i][1],
                    xEnd: scaleX.getRange(i + 0.5),
                    yEnd: height,
                    strokeColor: colorD,
                    lineWidth: 1,
                    lineType: 'solid'
                }
            }));
        }

        //创建图片原点
        circleGroup.addChild(new ImageShape({
            style: {
                x: polyLineArr[i][0] - 10 * proportion,
                y: polyLineArr[i][1] - 10 * proportion,
                image: src + ".png",
                width: 20 * proportion,
                height: 20 * proportion
            },
            hoverable: false
        }));
        //创建数据文字
        circleGroup.addChild(new TextShape({
            style: {
                x: tX,
                y: tY,
                textAlign: 'center',
                color: tC,
                text: t,
                textFont:  14 * proportion + 'px 微软雅黑'
            },
            hoverable: false
        }));

    }
    circleGroup.position = [margin.left, margin.top];
    axisGroupX.position = [margin.left, margin.top + height];

    zr.addGroup(rectGroup);
    zr.addShape(jgx);
    zr.addShape(poluLineGroup);
    zr.addGroup(circleGroup);
    zr.addGroup(axisGroupX);


    return zr;


}

module.exports = BrokenLineChart;