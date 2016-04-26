/**
 * zrender扩展
 * @module zrender
 * @author zw (赵伟, 1512763623@qq.com)
 */
var zrender = require("./../zrender/zrender");
var Group = require('./../zrender/Group');
var Polyline = require("./../zrender/shape/Polyline");
var CircleShape = require('./../zrender/shape/Circle');
var SectorShape = require("./../zrender/shape/Sector");
var RectangleShape = require('./../zrender/shape/Rectangle');
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
    var type=config.type;
    var length = data.length;
    var margin = config.margin;
    var i = 0, j = 0, k = 0;


    var domain=config.domain;
    var sum = 7;
    if(type==='per'){
        domain=[0,100];
        sum=10;

        var totalStuNum=data[0]?data[0].totalStuNum: 0,totalStuNum02=data[0]?data[0].totalStuNum02:0;


        for(i=0;i<data.length;i++){
            // console.log(data[i]);
            for(j=0;j<data[i].data.length;j++){
                data[i].data[j].per01=parseInt(data[i].data[j].number/totalStuNum*100);
                data[i].data[j].per02=parseInt(data[i].data[j].number1/totalStuNum02*100);
                if(isNaN(data[i].data[j].per01)) data[i].data[j].per01=0;
                if(isNaN(data[i].data[j].per02)) data[i].data[j].per02=0;
            }

        }
        for(i=0;i<data.length;i++){
            for(j=0;j<data[i].data.length;j++){
                var z,indexK= 0,aC3=0;
                for(z=0;z<4;z++){
                    if(j!==z&&data[i].data[j].per01===data[i].data[z].per01){
                        break;
                    }
                    if(j===3){
                        indexK=z;
                    }
                }
                for(j=0;j<4;j++){
                    if(j!==indexK){
                        aC3+=data[i].data[j].per01;
                    }
                }
                data[i].data[indexK].per01=100-aC3;
            }
        }
    }


    //创建tab标签
    var tab = document.createElement("div");
    tab.className = "histogramChartTab";

    //当鼠标移入tab显示tab，因为tab是绝对定位，鼠标移入就不属于在父亲节点上，就会执行下面鼠标移除图表div事件
    tab.onmouseover = function () {
        this.style.display = "block";
    };
    //当鼠标移出图表div隐藏鼠标跟随的tab
    div.onmouseout = function () {
        tab.style.display = "none";
    };
    if (div.parentNode.childNodes[1]) div.parentNode.childNodes[1].remove();
    div.parentNode.appendChild(tab);


    /**
     * 初始化zrender对象
     */
    var zr = zrender.init(div);

    //初始化margin
    var width = (config.width ? config.width : parseInt(div.offsetWidth)) - margin.left - margin.right,
        height = (config.height ? config.height : parseInt(div.offsetHeight)) - margin.bottom - margin.top;

    //初始化坐标尺
    var scaleY = new Scale()
        .setDomain(domain)
        .setRange([height, 0]);
    var scaleX = new Scale()
        .setDomain(4)
        .setRange([0, width]);

    //创建Y坐标------------start
    var axisY = new Group();

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
    var rp="人";
    if(type==='per'){
         rp="%";
    }
    for (i = 0; i <= sum; i++) {
        axisY.addChild(new LineShape({
            style: {
                xStart: -width,
                yStart: scaleY.getRange(i * section),
                xEnd: 5,
                yEnd: scaleY.getRange(i * section),
                strokeColor: '#dfe7ea',
                lineWidth: 1,
                lineType: 'solid'
            },
            hoverable: false
        }));
        axisY.addChild(new TextShape({
            style: {
                x: 8,
                y: scaleY.getRange(i * section),
                maxWidth: 30,
                color: 'rgba(0, 0, 0, 1)',
                text: i * section + rp,
                textFont: '12px 微软雅黑'
            },
            hoverable: false
        }));
    }
    axisY.position = [width - margin.left, margin.top];
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
    for (i = 0; i < 4; i++) {

        axisX.addChild(new TextShape({
            style: {
                x: scaleX.getRange(i + 0.5),
                y: 18,
                textAlign: 'center',
                color: 'rgba(0, 0, 0, 1)',
                text: config.arr[i][0],
                textFont: '24px 微软雅黑'
            },
            hoverable: false
        }));
        axisX.addChild(new TextShape({
            style: {
                x: scaleX.getRange(i + 0.5),
                y: 40,
                textAlign: 'center',
                color: 'rgba(0, 0, 0, 1)',
                text: config.arr[i][1],
                textFont: '12px 微软雅黑'
            },
            hoverable: false
        }));

        if (i === 2) {
            axisX.addChild(new LineShape({
                style: {
                    xStart: scaleX.getRange(i + 1),
                    yStart: 0,
                    xEnd: scaleX.getRange(i + 1),
                    yEnd: -height,
                    strokeColor: '#e2bbbb',
                    lineWidth: 1,
                    lineType: 'solid'
                },
                hoverable: false

            }));
        }


    }

    axisX.position = [margin.left, margin.top + height];
    //创建X坐标------------end

    //创建数据点
    var colours = ["#4466bb", "#44bbaa", "#4499bb", "#6644bb", "#6644bb", "#6644bb", "#6644bb", "#6644bb", "#6644bb"];
    var pyLeft = length * 30 / 2 - 15;

    var rectGroup = new Group();
    inites(data);


    function inites(data){
        for (i = 0; i < length; i++) {

            //data数据初始化

            var polyLineArr = [], polyLineArr1 = [];
            for (k = 0; k < data[i].data.length; k++) {
                var ls = [], ls1 = [];
                var number01=data[i].data[k].number,number02=data[i].data[k].number1;
                if(type==='per'){
                    number01=data[i].data[k].per01;
                    number02=data[i].data[k].per02;
                }

                ls[0] = scaleX.getRange(k + 0.5);
                ls[1] = scaleY.getRange(number01);
                ls1[0] = scaleX.getRange(k + 0.5);
                ls1[1] = scaleY.getRange(number02);
                polyLineArr.push(ls);
                polyLineArr1.push(ls1);
            }
            for (j = 0; j < data[i].data.length; j++) {
                var xEnd1 = polyLineArr1[j][0] + i * 30 + margin.left - pyLeft;
                var yEnd1 = polyLineArr1[j][1] + 9 + margin.top;
                var xStart = polyLineArr[j][0] + i * 30 + margin.left - pyLeft;
                var yStart = height + margin.top;
                var xEnd = polyLineArr[j][0] + i * 30 + margin.left - pyLeft;
                var yEnd = polyLineArr[j][1] + 9 + margin.top;

                //创建矩形上文字
                var number011=data[i].data[j].number;
                if(type==='per'){
                    number011=data[i].data[j].per01+'%';
                }
                var textSp = new TextShape({
                    style: {
                        x: xEnd,
                        y: yEnd - 20,
                        textAlign: 'center',
                        text:number011,
                        textFont: '14px 微软雅黑',
                        color: '#000'
                    },
                    hoverable: false
                });

                var yEnd2 = yEnd1;
                if (yEnd1 > yEnd) yEnd2 = yEnd;
                //创建上次数据的矩形
                var lineShape1 = new LineShape({
                    style: {
                        xStart: xStart,
                        yStart: yStart,
                        xEnd: xEnd1,
                        yEnd: yEnd2,
                        strokeColor: colours[i],
                        lineWidth: 20,
                        opacity: 0,
                        lineCap: 'round',
                        lineType: 'solid'
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
                        strokeColor: colours[i],
                        lineWidth: 20,
                        lineCap: 'round',
                        lineType: 'solid'
                    },
                    hoverable: false
                });
                //创建隐藏的矩形
                var lineShape = new LineShape({
                    style: {
                        xStart: xStart+10,
                        yStart: yStart,
                        xEnd: xEnd+10,
                        yEnd: yEnd,
                        strokeColor: "#000",
                        lineWidth: 40,
                        opacity: 0,
                        lineCap: 'round',
                        lineType: 'solid'
                    },
                    hoverable: false,
                    onmousemove: function () {

                        //当this.key=false,或者为nudefin时，判断鼠标已经移入但未移出时，不执行内部动画
                        if (!this.key) {
                            //为隐藏矩形设置当前触发变化时间，保存提供和下一鼠标运动时间做对比，如果时间间隔大于动画时间，继续触发动画
                            var newTime = new Date();
                            if ((newTime - this.newDate) > 1001) {
                                //进入动画执行，把当前时间附值给隐藏矩形
                                this.newDate = newTime;

                                //设置鼠标移入时的tab显示Div位置和数据
                                var tabTop = this.data.yEnd;
                                if (tabTop + 100 > height) {
                                    tabTop -= 100;
                                }
                                tab.style.top = tabTop + 'px';
                                tab.style.left = this.data.xEnd + 10 + 'px';
                                tab.style.display = 'block';
                                var chanz = this.data.number1 - this.data.number,chanz1="";
                                var num01=this.data.number,num02=this.data.number1;
                                if(type==='per'){
                                    chanz=this.data.per02-this.data.per01;
                                    chanz1='%';
                                    num01=this.data.per01+'%';
                                    num02=this.data.per02+'%';
                                }
                                if (chanz < 0) {
                                    tab.innerHTML = "上周：" + num02 + "<br/>本周：" + num01 + "<br/>上升：" + (-chanz)+chanz1;
                                } else if (chanz === 0) {
                                    tab.innerHTML = "上周：" + num02 + "<br/>本周：" + num01;
                                } else {
                                    tab.innerHTML = "上周：" + num02 + "<br/>本周：" +num01 + "<br/>下降：" + chanz+chanz1;
                                }


                                //设置当前练习柱形条高度动画
                                zr.animate(this.data.lineShape2.id, "style", false)
                                    .when(1, {
                                        xEnd: this.data.xEnd1,
                                        yEnd: this.data.yEnd1
                                    })
                                    .when(1000, {
                                        xEnd: this.data.xEnd,
                                        yEnd: this.data.yEnd
                                    })
                                    .start();
                                //设置当前练习柱形条上面文字位置动画
                                zr.animate(this.data.textSp.id, "style", false)
                                    .when(1, {
                                        y: (this.data.yEnd1 - 20)
                                    })
                                    .when(1000, {

                                        y: (this.data.yEnd - 20)
                                    })
                                    .start();

                                //设置上一次前练习柱形条高度动画
                                zr.animate(this.data.lineShape1.id, "style", false)
                                    .when(1, {
                                        opacity: 0.5
                                    })
                                    .when(1000, {
                                        opacity: 0.5
                                    })
                                    .when(1101, {
                                        opacity: 0
                                    })
                                    .start();
                            }

                            this.key = true;
                        } else {
                            this.key = false;
                        }

                    },
                    onmouseout: function () {
                        this.key = false;
                        this.data.lineShape1.style.opacity = 0;
                    }
                });
                lineShape.data = {
                    xEnd1: xEnd1, yEnd1: yEnd1,
                    xEnd: xEnd, yEnd: yEnd,
                    lineShape1: lineShape1,
                    lineShape2: lineShape2, textSp: textSp,
                    number: data[i].data[j].number, number1: data[i].data[j].number1,
                    per01: data[i].data[j].per01, per02: data[i].data[j].per02
                };
                lineShape.newDate = new Date();

                if (data[i].data[j].number1 !== 0) rectGroup.addChild(lineShape1);
                if (data[i].data[j].number !== 0) rectGroup.addChild(lineShape2);
                rectGroup.addChild(textSp);
                rectGroup.addChild(lineShape);


            }

        }
    }

    //rectGroup.position = [margin.left-pyLeft, margin.top];
    zr.addGroup(axisY);
    zr.addGroup(rectGroup);
    zr.addGroup(axisX);


    return zr;


}

module.exports = BrokenLineChart;