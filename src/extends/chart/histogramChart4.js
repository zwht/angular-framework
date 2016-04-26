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
    if(!data) return;
    var margin = config.margin;
    var i = 0, j = 0;

    /**
     * 初始化zrender对象
     */
    var zr = zrender.init(div);
    //初始化margin
    var width = (config.width ? config.width : parseInt(div.offsetWidth)) - margin.left - margin.right,
        height = (config.height ? config.height : parseInt(div.offsetHeight)) - margin.bottom - margin.top;


    //初始化坐标尺
    var scaleY = new Scale()
        .setDomain(config.domain)
        .setRange([height, 0]);
    var scaleX = new Scale()
        .setDomain(10)
        .setRange([0, width]);


    var histogram = new Group();
    var lineShape1 = new LineShape({
        style: {
            xStart: scaleX.getRange(5),
            yStart: scaleY.getRange(data.total),
            xEnd: scaleX.getRange(5),
            yEnd: scaleY.getRange(0),
            strokeColor: "#d6ddee",
            lineWidth: 60,
            lineType: 'solid'
        },
        hoverable: false
    });
    var lineShape2 = new LineShape({
        style: {
            xStart: scaleX.getRange(5),
            yStart: scaleY.getRange(data.score),
            xEnd: scaleX.getRange(5),
            yEnd: scaleY.getRange(0),
            strokeColor: "#4466bb",
            lineWidth: 60,
            lineType: 'solid'
        },
        hoverable: false
    });
    var lineText=new TextShape({
       style:{
           x:scaleX.getRange(5),
           y: scaleY.getRange(data.total)-20,
           text:data.score,
           textAlign:'center',
           textFont: '26px 微软雅黑'
       }
    });

    histogram.addChild(lineShape1);
    histogram.addChild(lineShape2);
    histogram.addChild(lineText);
    histogram.position=[margin.left,margin.top];

    var classAVG = new Group();
    //班级平均分
    classAVG.addChild(new LineShape({
        style: {
            xStart: scaleX.getRange(5) - 30,
            yStart: scaleY.getRange(data.classScore),
            xEnd: scaleX.getRange(5)+60,
            yEnd: scaleY.getRange(data.classScore),
            strokeColor: "#6abb4f",
            lineWidth: 2,
            lineType: 'solid'
        },
        hoverable: false
    }));
    classAVG.addChild(
        new LineShape({
            style: {
                xStart: scaleX.getRange(5)+60,
                yStart: scaleY.getRange(data.classScore),
                xEnd: scaleX.getRange(5)+150,
                yEnd: scaleY.getRange(data.classScore),
                strokeColor: "#6abb4f",
                lineWidth: 20,
                lineType: 'solid',
                lineCap:'round'
            },
            hoverable: false
        })
    );
    classAVG.addChild(
        new TextShape({
            style: {
                x:  scaleX.getRange(5)+105,
                y: scaleY.getRange(data.classScore),
                text:"班级平均 "+data.classScore.toFixed(),
                color:"#FFF",
                textFont: '14px 微软雅黑',
                textAlign:'center'
            },
            hoverable: false
        })
    );
    classAVG.position=[margin.left,margin.top];

    //学校平均分
    data.gradeScore=data.gradeScore||0;
    var gradeAVG = new Group();
    gradeAVG.addChild(new LineShape({
        style: {
            xStart: (scaleX.getRange(5))+30,
            yStart: scaleY.getRange(data.gradeScore),
            xEnd: scaleX.getRange(5)-60,
            yEnd: scaleY.getRange(data.gradeScore),
            strokeColor: "#bbb54f",
            lineWidth: 2,
            lineType: 'solid'
        },
        hoverable: false
    }));
    gradeAVG.addChild(
        new LineShape({
            style: {
                xStart: scaleX.getRange(5)-60,
                yStart: scaleY.getRange(data.gradeScore),
                xEnd: scaleX.getRange(5)-160,
                yEnd: scaleY.getRange(data.gradeScore),
                strokeColor: "#bbb54f",
                lineWidth: 20,
                lineType: 'solid',
                lineCap:'round'
            },
            hoverable: false
        })
    );
    gradeAVG.addChild(
        new TextShape({
            style: {
                x:  scaleX.getRange(5)-105,
                y: scaleY.getRange(data.gradeScore),
                text:"年级平均 "+data.gradeScore.toFixed(),
                color:"#FFF",
                textFont: '14px 微软雅黑',
                textAlign:'center'
            },
            hoverable: false
        })
    );
    gradeAVG.position=[margin.left,margin.top];


    zr.addGroup(histogram);
    if(data.classScore) zr.addGroup(classAVG);
    if(data.gradeScore) zr.addGroup(gradeAVG);

    return zr;


}

module.exports = BrokenLineChart;