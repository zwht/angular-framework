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
var PolygonShape = require('./../zrender/shape/Polygon');
var PolygonShapeLine = require('./../zrender/shape/PolygonLine');
var TextShape = require('./../zrender/shape/Text');


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
function twoLineChart(config) {

    var div = document.getElementById(config.id);
    var data = config.data;
    /*data = [{
        date: "09.25",
        ranking: 40,
        score: 1
    }];*/

    var margin = config.margin;
    var length = data.length;

    //创建tab标签
    var tab = document.createElement("div");
    tab.className = "twoLineChartTab";

    //初始化margin
    var width = (config.width ? config.width : parseInt(div.offsetWidth)) - margin.left - margin.right,
        height = (config.height ? config.height : parseInt(div.offsetHeight)) - margin.bottom - margin.top;


    //初始化zrender对象
    var zr = zrender.init(div);

    //初始化坐标尺
    var scaleY = new Scale()
        .setDomain(config.domain)
        .setRange([height, 0]);
    var scaleY1 = new Scale()
        .setDomain([1, config.totalNumber])
        .setRange([0, height]);
    var scaleX = new Scale()
        .setDomain(data.length - 1)
        .setRange([0, width]);
    if (length === 1) {
        scaleX = new Scale()
            .setDomain(2)
            .setRange([0, width]);
    }


    //data数据初始化
    var rankingKey = true, rankingKeyCunt = 0;
    var scoreKey = true, scoreKeyCunt = 0;

    var i = 0, arr = [], polyLineArr = [], polyLineArrArea = [], polyLineArr1 = [], polyLineArr1Area = [];
    for (i = 0; i < data.length; i++) {
        if (data[i].ranking <= 0) {
            rankingKeyCunt++;
            if (rankingKeyCunt === data.length) {
                rankingKey = false;
            }
        }
        if (data[i].score < 0) {
            scoreKeyCunt++;
            if (scoreKeyCunt === data.length) {
                scoreKey = false;
            }
        }
    }
    for (i = 0; i < data.length; i++) {
        var ls = [], ls1 = [];
        arr[i] = data[i].name;
        ls[0] = scaleX.getRange(i);
        ls[1] = scaleY.getRange(data[i].score);
        ls1[0] = scaleX.getRange(i);

        if (data[i].ranking <= 0 && data[i].score <= 0){
            data[i].error = "本次未参考";
        }
        if (rankingKey && data[i].ranking <= 0 && (data[i].score <= 0||!data[i].score)) {
            data[i].error = "本次未参考";
            data[i].ranking = config.totalNumber;
        }

        ls1[1] = scaleY1.getRange(data[i].ranking);
        polyLineArrArea.push(ls);
        polyLineArr.push(ls);
        polyLineArr1Area.push(ls1);
        polyLineArr1.push(ls1);
    }


    //创建Y坐标------------start

    var axisY = new Group();
    var sum = 10;
    //section是定义域范围内分段的每一段的大小
    var section = (scaleY.domain.max - scaleY.domain.min) / sum;
    if (scoreKey) {
        //for循环Y轴分段数，创建对应shape
        for (i = 0; i <= sum; i++) {
            axisY.addChild(new TextShape({
                style: {
                    x: margin.left - 4,
                    y: scaleY.getRange(i * section),
                    maxWidth: 30,
                    color: '#5bbbaa',
                    text: parseInt(i * section),
                    textFont: '12px 微软雅黑',
                    textAlign: 'right'
                },
                hoverable: false
            }));

        }
    }
    axisY.position = [0, margin.top];
    //创建Y坐标------------end

    //创建右侧Y坐标------------start
    var axisY1 = new Group();
    var sum1 = 10;
    //section是定义域范围内分段的每一段的大小
    var section1 = (scaleY1.domain.max - 0) / sum;
    //for循环Y轴分段数，创建对应shape
    if (rankingKey) {
        for (i = 0; i <= sum1; i++) {
            var tt = i * section1;
            if (i === 0) tt = 1;
            axisY1.addChild(new TextShape({
                style: {
                    x: 0,
                    y: scaleY1.getRange(tt),
                    maxWidth: 30,
                    color: '#4466bb',
                    text: parseInt(tt),
                    textFont: '12px 微软雅黑',
                    textAlign: 'left'
                },
                hoverable: false
            }));

        }
    }
    axisY1.position = [0, margin.top];
    axisY1.position = [width + margin.left + 3, margin.top];
    //创建右侧Y坐标------------end
    //创建X坐标------------start
    var axisX = new Group();
    //for循环Y轴分段数，创建对应shape
    axisX.addChild(new LineShape({
        style: {
            xStart: width + margin.left + margin.right,
            yStart: 0,
            xEnd: -margin.left,
            yEnd: 0,
            strokeColor: '#dfe7ea',
            lineWidth: 2,
            lineType: 'solid'
        },
        hoverable: false
    }));
    axisX.addChild(new LineShape({
        style: {
            xStart: width + margin.left + margin.right,
            yStart: -height,
            xEnd: -margin.left,
            yEnd: -height,
            strokeColor: '#dfe7ea',
            lineWidth: 2,
            lineType: 'solid'
        },
        hoverable: false
    }));

    if (length > 1) {
        for (i = 0; i < length; i++) {

            axisX.addChild(new LineShape({

                style: {
                    xStart: scaleX.getRange(i),
                    yStart: margin.bottom,
                    xEnd: scaleX.getRange(i),
                    yEnd: -height - margin.bottom - margin.top,
                    strokeColor: '#d9e3e7',
                    lineWidth: 2,
                    lineType: 'solid'
                }
            }));

            axisX.addChild(new TextShape({
                style: {
                    x: scaleX.getRange(i),
                    y: 15,
                    textAlign: 'center',
                    color: 'rgba(0, 0, 0, 1)',
                    text: data[i].date,
                    textFont: '12px 微软雅黑'
                },
                hoverable: false
            }));

        }
    } else {
        axisX.addChild(new LineShape({

            style: {
                xStart: scaleX.getRange(1),
                yStart: margin.bottom,
                xEnd: scaleX.getRange(1),
                yEnd: -height - margin.bottom - margin.top,
                strokeColor: '#d9e3e7',
                lineWidth: 2,
                lineType: 'solid'
            }
        }));

        axisX.addChild(new TextShape({
            style: {
                x: scaleX.getRange(1),
                y: 15,
                textAlign: 'center',
                color: 'rgba(0, 0, 0, 1)',
                text: data[0].date,
                textFont: '12px 微软雅黑'
            },
            hoverable: false
        }));
    }


    axisX.position = [margin.left, margin.top + height];
    //创建X坐标------------end

    //创建折线
    var polyLine;
    if (data[0].score >= 0) {
        polyLine = new Polyline({
            style: {
                pointList: polyLineArr,
                smooth: "spline",
                strokeColor: '#55b8b3',
                lineWidth: 2
            },

            hoverable: false
        });

        polyLine.position = [margin.left, margin.top];
    }

    //创建折线1
    var polyLine1;
    if (data[0].ranking >= 0) {
        polyLine1 = new Polyline({
            style: {
                pointList: polyLineArr1,
                smooth: "spline",
                strokeColor: '#4466bb',
                lineWidth: 2
            },

            hoverable: false
        });
        polyLine1.position = [margin.left, margin.top];
    }


    var kk = [width, height + margin.bottom], kk1 = [0, height + margin.bottom];

    polyLineArrArea.push(kk);
    polyLineArrArea.push(kk1);

    var polygonShape = new PolygonShapeLine({
        style: {
            pointList: polyLineArrArea,
            smooth: "spline",
            smoothMove: "2",
            color: 'rgba(68,178,172, 0.1)'
        },
        hoverable: false
    });
    polygonShape.position = [margin.left, margin.top];

    polyLineArr1Area.push(kk);
    polyLineArr1Area.push(kk1);

    var polygonShape1 = new PolygonShapeLine({
        style: {
            pointList: polyLineArr1Area,
            smooth: "spline",
            smoothMove: "2",
            color: 'rgba(68,102,187, 0.1)'
        },
        hoverable: false
    });
    polygonShape1.position = [margin.left, margin.top];


    var polyLine_1, polyLine1_1;
    if (length === 1) {
        polyLine_1 = new CircleShape({
            style: {
                x: scaleX.getRange(2),
                y: scaleY.getRange(data[0].score),
                r: 6,
                color: '#4466bb'
            },
            hoverable: false
        });

        polyLine1_1 = new CircleShape({
            style: {
                x: scaleX.getRange(2),
                y: scaleY1.getRange(data[0].ranking),
                r: 6,
                color: '#4466bb'
            },
            hoverable: false
        });
        polyLine1_1.position = [margin.left, margin.top];
        polyLine_1.position = [margin.left, margin.top];
    }


    //创建数据点
    var circleGroup = new Group();
    var rectGroup = new Group();

    var circle01 = new CircleShape({
        style: {
            x: -19,
            y: -19,
            r: 6,
            color: '#55b8b3'
        },
        hoverable: false
    });
    var circle02 = new CircleShape({
        style: {
            x: -19,
            y: -19,
            r: 6,
            color: '#4466bb'
        },
        hoverable: false
    });

    var lineBig = new LineShape({

        style: {
            xStart: -4,
            yStart: 0,
            xEnd: -4,
            yEnd: height + margin.bottom + margin.top,
            strokeColor: '#d9e3e7',
            lineWidth: 6,
            lineType: 'solid'
        }
    });


    var rectX, rectWidth, rect;
    if (polyLineArr.length > 1) {
        for (i = 0; i < polyLineArr.length; i++) {

            //创建隐藏的矩形
            rectX = scaleX.getRange(i) - scaleX.getRange(1) / 2;
            rectWidth = scaleX.getRange(1);
            if (i === 0 || i === polyLineArr.length - 1) {
                if (i === 0)  rectX = scaleX.getRange(i);
                rectWidth = scaleX.getRange(1) / 2;
            }
            rect = new RectangleShape({
                style: {
                    x: rectX,
                    y: 0,
                    width: rectWidth,
                    height: height + margin.top + margin.bottom,
                    color: 'rgba(0, 0, 0, 0)'
                },
                hoverable: false,
                onmousemove: function () {

                    //当this.key=false,或者为nudefin时，判断鼠标已经移入但未移出时，不执行内部动画
                    if (!this.key) {
                        //为隐藏矩形设置当前触发变化时间，保存提供和下一鼠标运动时间做对比，如果时间间隔大于动画时间，继续触发动画
                        //设置鼠标移入时的tab显示Div位置和数据
                        var tabTop = margin.top, tabLeft = margin.left;
                        if (!rankingKey) {
                            tabTop += this.data1[1];
                            tabLeft += this.data1[0];
                        } else {
                            tabTop += this.data2[1];
                            tabLeft += this.data2[0];
                        }

                        if (tabTop + 80 > height) tabTop -= 80;
                        if (tabLeft + 100 > width) tabLeft -= 100;

                        tab.style.top = tabTop + 'px';
                        tab.style.left = tabLeft + 'px';
                        tab.innerHTML = "得分：" + this.data.score + "<br/>排名：" + this.data.ranking;
                        var htStr = "";
                        if (this.data.error) {
                            tab.style.padding = '27px 10px 0 10px';
                            tab.style.color = "#F7B537";
                            htStr = this.data.error;
                        } else {
                            tab.style.padding = '14px 10px 20px 10px';
                            tab.style.color = "#FFF";
                            if (data[0].score >= 0) htStr += "得分：" + this.data.score + "<br/>";
                            if (data[0].ranking >= 0) htStr += "排名：" + this.data.ranking + "<br/>";
                        }


                        tab.innerHTML = htStr;

                        circle01.style.x = this.data1[0] + margin.left;
                        circle01.style.y = this.data1[1] + margin.top;
                        circle02.style.x = this.data2[0] + margin.left;
                        circle02.style.y = this.data2[1] + margin.top;
                        lineBig.style.xStart = this.lineX;
                        lineBig.style.xEnd = this.lineX;

                        zr.render();
                    } else {
                        this.key = false;
                    }

                },
                onmouseout: function () {
                    this.key = false;
                }
            });
            rect.data = data[i];
            rect.data1 = polyLineArr[i];
            rect.data2 = polyLineArr1[i];
            rect.lineX = scaleX.getRange(i) + margin.left;


            rectGroup.addChild(rect);
        }
    } else {


        var tabTop = margin.top, tabLeft = margin.left + width / 2 + 5;
        if (!rankingKey) {
            tabTop += polyLineArr[0][1];
        } else {
            tabTop += polyLineArr1[0][1];
        }

        if (tabTop + 80 > height) tabTop -= 80;


        //创建隐藏的矩形
        rect = new RectangleShape({
            style: {
                x: 0,
                y: 0,
                width: width,
                height: height + margin.top + margin.bottom,
                color: 'rgba(0, 0, 0, 0)'
            },
            hoverable: false,
            onmousemove: function () {

                //当this.key=false,或者为nudefin时，判断鼠标已经移入但未移出时，不执行内部动画
                if (!this.key) {
                    tab.style.top = tabTop + 'px';
                    tab.style.left = tabLeft + 'px';
                    tab.innerHTML = "得分：" + data[0].score + "<br/>排名：" + data[0].ranking;
                    var htStr = "";
                    if (data[0].error) {
                        tab.style.padding = '27px 10px 0 10px';
                        tab.style.color = "#F7B537";
                        htStr = data[0].error;
                    } else {
                        tab.style.padding = '14px 10px 20px 10px';
                        tab.style.color = "#FFF";
                        if (data[0].score >= 0) htStr += "得分：" + data[0].score + "<br/>";
                        if (data[0].ranking >= 0) htStr += "排名：" + data[0].ranking + "<br/>";
                    }

                    tab.innerHTML = htStr;
                    lineBig.style.xStart = scaleX.getRange(1) + margin.left;
                    lineBig.style.xEnd = scaleX.getRange(1) + margin.left;
                } else {
                    this.key = false;
                }
                zr.render();
            },
            onmouseout: function () {
                this.key = false;
            }
        });

        rectGroup.addChild(rect);

        circle01.style.x = width / 2 + margin.left;
        circle01.style.y = polyLineArr[0][1] + margin.top;
        circle02.style.x = width / 2 + margin.left;
        circle02.style.y = polyLineArr1[0][1] + margin.top;

        zr.render();

    }

    circleGroup.position = [margin.left, margin.top];
    rectGroup.position = [margin.left, 0];

    //当鼠标移出图表div隐藏鼠标跟随的tab

    div.onmouseout = function () {
        tab.style.left = -2000 + 'px';
        lineBig.style.xEnd = lineBig.style.xStart=-200;
        if (polyLineArr.length > 1) {
            circle02.style.y = circle02.style.x = circle01.style.y = circle01.style.x = -100;
        }
        zr.render();

    };


    zr.addGroup(lineBig);

    zr.addGroup(axisX);
    if (scoreKey) zr.addGroup(axisY);
    if (rankingKey) zr.addGroup(axisY1);

    if (scoreKey) zr.addGroup(polyLine);
    if (rankingKey) zr.addGroup(polyLine1);

    //return
    if (length === 1) {
        //zr.addGroup(polyLine_1);
        //zr.addGroup(polyLine1_1);
    } else {
        zr.addGroup(polygonShape);
        zr.addGroup(polygonShape1);
    }


    zr.addGroup(circleGroup);

    zr.addGroup(circle01);
    zr.addGroup(circle02);

    zr.addGroup(rectGroup);

    div.appendChild(tab);
    return zr;

}

module.exports = twoLineChart;