/**
 * zrender扩展
 * @module zrender
 * @author zw (赵伟, 1512763623@qq.com)
 */
var zrender = require("./../zrender/zrender");
var Group = require('./../zrender/Group');
var Polyline = require("./../zrender/shape/Polyline");
var CircleShape = require('./../zrender/shape/Circle');
var LineShape = require('./../zrender/shape/Line');
var TextShape = require('./../zrender/shape/Text');
var ImageShape = require('./../zrender/shape/Image');

var Scale = require('./tool/Scale');
var Axis = require('./tool/Axis');


/**
 * 柱形条学生考试统计
 * @class brokenLineChart（柱形图）
 * @constructor
 * @example
 *      var config = {
                id: chart + count,
                data: scope.histogramChart,
                domain: [0, 35],
                margin: {top: 20, right: 40, bottom: 60, left:0}
            };
 var brokenLineChart=new BrokenLineChart(config);
 *
 *
 */
function BrokenLineChart(config) {
    var div = document.getElementById(config.id);
    var data = config.data;
    var length = data.length;
    var margin = config.margin;
    var i = 0, j = 0;

    /**
     * 初始化zrender对象
     */
    var zr = zrender.init(div);
    //初始化margin
    var width = (config.width ? config.width : parseInt(div.offsetWidth)) - margin.left - margin.right,
        height = (config.height ? config.height : parseInt(div.offsetHeight)) - margin.bottom - margin.top;

    //设置柱形条宽度，大于60就设置为60
    var oneWidth = width / length / 2;
    if (oneWidth > 60) oneWidth = 60;

    //初始化坐标尺
    var scaleY = new Scale()
        .setDomain(config.domain)
        .setRange([height, 0]);
    var scaleX = new Scale()
        .setDomain(length)
        .setRange([0, width]);


    //创建Y坐标------------start
    var axisY = new Group();
    var sum = 5;
    //创建Y轴坐标线不包括坐标数据和点
    axisY.addChild(new LineShape({
        style: {
            xStart: 0,
            yStart: 0,
            xEnd: 0,
            yEnd: scaleY.range.max,
            strokeColor: '#dfe7ea',
            lineWidth: 1,
            lineType: 'solid'
        },
        hoverable: false
    }));
    //section是定义域范围内分段的每一段的大小
    var section = (scaleY.domain.max - scaleY.domain.min) / sum;
    //for循环Y轴分段数，创建对应shape
    for (i = 0; i <= sum; i++) {
        var co = "#dfe7ea";
        axisY.addChild(new LineShape({
            style: {
                xStart: width,
                yStart: scaleY.getRange(i * section),
                xEnd: -10,
                yEnd: scaleY.getRange(i * section),
                strokeColor: co,
                lineWidth: 1,
                lineType: 'solid'
            },
            hoverable: false
        }));

        var text = i * section;
        if (text === 0) text = 1;
        axisY.addChild(new TextShape({
            style: {
                x: -margin.left,
                y: scaleY.getRange(i * section),
                maxWidth: 30,
                color: 'rgba(0, 0, 0, 1)',
                text: text,
                textFont: '12px 微软雅黑'
            },
            hoverable: false
        }));

    }
    axisY.position = [margin.left, margin.top];
    //创建Y坐标------------end

    //创建X坐标------------start
    var axisX = new Group();
    axisX.addChild(new LineShape({
        style: {
            xStart: 0,
            yStart: 11,
            xEnd: width + 5,
            yEnd: 11,
            strokeColor: '#FFF',
            lineWidth: 20,
            lineType: 'solid'
        },
        hoverable: false

    }));
    //for循环Y轴分段数，创建对应shape
    for (i = 0; i < length; i++) {

        axisX.addChild(new TextShape({
            style: {
                x: scaleX.getRange(i + 0.5),
                y: 20,
                textAlign: 'center',
                color: 'rgba(0, 0, 0, 1)',
                text: data[i].name,
                textFont: '18px 微软雅黑'
            },
            hoverable: false
        }));
        axisX.addChild(new TextShape({
            style: {
                x: scaleX.getRange(i + 0.5),
                y: 40,
                textAlign: 'center',
                color: 'rgba(0, 0, 0, 1)',
                text: "(" + data[i].time + ")",
                textFont: '12px 微软雅黑'
            },
            hoverable: false
        }));
    }
    axisX.position = [margin.left, margin.top + height];
    //创建X坐标------------end


    //data数据初始化
    var polyLineArr = [], maxIndex = 0, minIndex = 0, max = data[0].pre, min = data[0].pre;
    for (i = 0; i < length; i++) {
        var ls = [];
        if (data[i].data === 1) data[i].data = 0;
        ls[0] = scaleX.getRange(i + 0.5);
        ls[1] = scaleY.getRange(data[i].data);

        polyLineArr.push(ls);
    }


    var rectGroup = new Group();
    //创建折线
    rectGroup.addChild(new Polyline({
        style: {
            pointList: polyLineArr,
            strokeColor: "#4499bb",
            lineWidth: 4,
            lineCap: 'round',
            lineType: 'solid',
            lineJoin: 'round'
        },
        hoverable: false
    }));
    //创建数据点
    for (i = 0; i < length; i++) {
        var xEnd = polyLineArr[i][0];
        var yEnd = polyLineArr[i][1];

        var circle01 = new CircleShape({
            style: {
                brushType: "both",
                x: xEnd,
                y: yEnd,
                r: 18,
                lineWidth: 4,
                strokeColor: "#4499bb",
                color: '#FFF'
            },
            hoverable: false
        });
        //创建矩形上文字
        var texCol = "#4499bb";
        var text1 = data[i].data;
        if (text1 === 0) text1 = 1;
        var textSp = new TextShape({
            style: {
                x: xEnd,
                y: yEnd,
                textAlign: 'center',
                text: text1,
                textFont: '16px 微软雅黑',
                color: texCol
            },
            hoverable: false
        });

        rectGroup.addChild(circle01);
        rectGroup.addChild(textSp);
        if(data[i].max){
            rectGroup.addChild(new ImageShape({
                style: {
                    x: xEnd-18,
                    y: yEnd-38,
                    image: "../assets/image/ionic/crown.png"
                },
                hoverable: false
            }));
        }

    }


    rectGroup.position = [margin.left, margin.top];

    zr.addGroup(axisY);
    zr.addGroup(rectGroup);
    zr.addGroup(axisX);


    return zr;


}

module.exports = BrokenLineChart;