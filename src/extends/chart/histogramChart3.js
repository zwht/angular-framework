/**
 * zrender扩展
 * @module zrender
 * @author zw (赵伟, 1512763623@qq.com)
 */
var zrender = require("./../zrender/zrender");
var Group = require('./../zrender/Group');
var LineShape = require('./../zrender/shape/Line');
var TextShape = require('./../zrender/shape/Text');

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
        if (i === 3) co = "#e2bbbb";
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
        axisY.addChild(new TextShape({
            style: {
                x: -margin.left,
                y: scaleY.getRange(i * section),
                maxWidth: 30,
                color: 'rgba(0, 0, 0, 1)',
                text: text + "%",
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
        ls[0] = scaleX.getRange(i + 0.5);
        ls[1] = scaleY.getRange(data[i].data);

        polyLineArr.push(ls);
    }
    //创建数据点
    var rectGroup = new Group();
    for (i = 0; i < length; i++) {


        var xStart = polyLineArr[i][0];
        var yStart = height;
        var xEnd = polyLineArr[i][0];
        var yEnd = polyLineArr[i][1];

        //创建矩形上文字
        var texCol = "#4499bb";
        var Test = data[i].data+"%";
        var textSp = new TextShape({
            style: {
                x: xEnd,
                y: yEnd - 10,
                textAlign: 'center',
                text: Test,
                textFont: '16px 微软雅黑',
                color: texCol
            },
            hoverable: false
        });
        //创建这次数据的矩形
        var lineShape2 = new LineShape({
            style: {
                xStart: xStart,
                yStart: yStart,
                xEnd: xEnd,
                yEnd: yEnd,
                strokeColor: texCol,
                lineWidth: oneWidth,
                lineType: 'solid'
            },
            hoverable: false
        });

        rectGroup.addChild(lineShape2);
        rectGroup.addChild(textSp);


    }
    rectGroup.position = [margin.left, margin.top];

    zr.addGroup(axisY);
    zr.addGroup(rectGroup);
    zr.addGroup(axisX);


    return zr;


}

module.exports = BrokenLineChart;