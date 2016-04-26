/**
 * zrender扩展
 * @module zrender
 * @author zw (赵伟, 1512763623@qq.com)
 */
var zrender = require("./../zrender/zrender");
var Group = require('./../zrender/Group');
var TextShape = require('./../zrender/shape/Text');
var PolygonShapeLine = require('./../zrender/shape/PolygonLine');

var Scale = require('./tool/Scale');

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


    //初始化坐标尺
    var scaleY = new Scale()
        .setDomain(config.domain)
        .setRange([height, 0]);
    var scaleX = new Scale()
        .setDomain(data.length + 1)
        .setRange([0, width]);


    var group1 = new Group(),group2=new Group();

    for (i = 0; i < length; i++) {

        var arr=[];
         arr=[[scaleX.getRange(i), height], [scaleX.getRange(i + 1), scaleY.getRange(data[i])], [scaleX.getRange(i + 2), height]];
        var arr2=[];
        arr2.push(scaleX.getRange(i));
        arr2.push(height);
        arr.push(arr2);
        var arr3=[];
        arr3.push(scaleX.getRange(i+1));
        arr3.push(scaleY.getRange(data[i]));
        arr.push(arr3);
        var arr4=[];
        arr4.push(scaleX.getRange(i + 2));
        arr4.push(height);
        arr.push(arr4);

        /*histogram.addChild(new PathShape ({
            style: {
                x:0,
                y:0,
                path : 'M '+scaleX.getRange(i)+' '+ height+' L '+scaleX.getRange(i + 1)+' '+scaleY.getRange(data[i])+' L'+scaleX.getRange(i + 2)+' '+ height+' Z',
                color :  'rgba(253, 229, 137, 0.7)'
            },
            hoverable: false
        }));*/
        var c='rgba(253, 229, 137, 0.7)',c1='#A7891F';
        if(i===length-1){
            c='rgba(193, 220, 125, 0.7)';
            c1='#769B5D';
        }
        group1.addChild(new PolygonShapeLine({
            style: {
                pointList: arr,
                smooth: "spline",
                smoothMove: "3",
                color:  c
            },
            hoverable: false
        }));
        group2.addChild(new TextShape({
            style: {
                x: scaleX.getRange(i+1),
                y: scaleY.getRange(data[i]) - 20,
                text: '第'+data[i]+'名',
                color:c1,
                textAlign: 'center',
                textFont: '20px 微软雅黑'
            },
            hoverable: false
        }));
    }
    group1.position = [margin.left, margin.top];
    group2.position = [margin.left, margin.top];

    zr.addGroup(group1);
    zr.addGroup(group2);
    return zr;
}
module.exports = BrokenLineChart;