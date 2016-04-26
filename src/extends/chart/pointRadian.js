/**
 * zrender扩展
 * @module zrender
 * @author zw (赵伟, 1512763623@qq.com)
 */
var zrender = require("./../zrender/zrender");
var Group = require('./../zrender/Group');
var TextShape = require('./../zrender/shape/Text');
var CircleShape = require('./../zrender/shape/Circle');
var SectorShape = require('./../zrender/shape/Sector');
var GetCirclePoint = require('./tool/GetCirclePoint');

function pointRadian(config) {
    var element = config.id ? document.getElementById(config.id) : config.element;
    var data = config.data, margin = config.margin, r = config.r, r0 = config.r0, i = 0;
    var startAngel = 90, endAngel = data[0] / (data[0] + data[1]) * 360 + 90;

    /**
     * 初始化zrender对象
     */
    var zr = zrender.init(element);
    //初始化margin
    var width = (config.width ? config.width : parseInt(element.offsetWidth)) - margin.left - margin.right,
        height = (config.height ? config.height : parseInt(element.offsetHeight)) - margin.bottom - margin.top;

    //设置圆点
    var circlePoint = {};
    circlePoint.x = config.x || width / 2;
    circlePoint.y = config.y || height / 2;

    //如果没有半径设置默认半径
    if (!r) r = (width > height) ? (height / 2) - 5 : (width / 2) - 5;
    if (!r0) r0 = r - 20;

    //设置画线上小圆的半径
    var minR = (r - r0) / 2;

    //设置获取圆上点的配置数据
    var con1 = {
        angle: startAngel,
        r: r - minR,
        x: circlePoint.x,
        y: circlePoint.y
    };
    //创建文字
    zr.addShape(new TextShape({
        style: {
            x: circlePoint.x,
            y: circlePoint.y - r / 2,
            text: '答对题数',
            textFont: 'bold ' + r * 0.2 + 'px Arial',
            textAlign: 'center',
            color:'#808080'
        },
        hoverable: false
    }));
    //创建文字1
    zr.addShape(new TextShape({
        style: {
            x: circlePoint.x,
            y: circlePoint.y + r / 2,
            text: '总共' + (data[0]+data[1]) + '道题',
            textFont: 'bold ' + r * 0.2 + 'px Arial',
            textAlign: 'center',
            color:'#808080'
        },
        hoverable: false
    }));
    //创建大文字
    var bigText=new TextShape({
        style: {
            x: circlePoint.x,
            y: circlePoint.y,
            text: 0,
            textFont: 'bold ' + r * 0.6 + 'px Arial',
            textAlign: 'center',
            color:'#808080'
        },
        hoverable: false
    });
    zr.addShape(bigText);
    //画底部扇形
    var radian1 = 360;
    var radianLength1 = 2 * Math.PI * r / 2, oneRadian1 = radian1 / radianLength1;
    for (i = 0; i < radianLength1; i++) {
        con1.angle += oneRadian1;
        var pointXY1 = GetCirclePoint(con1);
        //画小圆，组成圆弧
        zr.addShape(new CircleShape({
            style: {
                x: pointXY1.x,
                y: pointXY1.y,
                r: minR,
                color: '#E6EDF1'
            },
            hoverable: false
        }));
    }

    //设置获取圆上点的配置数据
    var con = {
        angle: startAngel,
        r: r - minR,
        x: circlePoint.x,
        y: circlePoint.y
    };
    //求把圆分为多少分，用周长来分，多少像素division分一段
    var radian = endAngel - startAngel;
    var radianLength = ((2 * Math.PI * r) * radian / 360) / 2, oneRadian = radian / radianLength;
    var timeKey = 1000 / radianLength;

    for (i = 0; i < radianLength; i++) {
        con.angle += oneRadian;
        var pointXY = GetCirclePoint(con);
        //画小圆，组成圆弧
        var c = 1;
        var oneCir = new CircleShape({
            style: {
                x: pointXY.x,
                y: pointXY.y,
                r: minR,
                color: 'rgba(175, 210, 144, ' + c + ')'
            },
            hoverable: false
        });
        round(oneCir, i);
    }
    function round(oneCir, t) {
        setTimeout(function () {
            zr.addShape(oneCir);
            bigText.style.text=Math.ceil(t*data[0]/radianLength);
        }, timeKey * t);
    }

    //画线上小点
    var pointXY2 = GetCirclePoint({
        angle: 90,
        r: r - minR,
        x: circlePoint.x,
        y: circlePoint.y
    });
    setTimeout(function () {
        zr.addShape(new CircleShape({
            style: {
                x: pointXY2.x,
                y: pointXY2.y,
                r: minR * 0.4,
                color: '#D7E8C7',
                shadowBlur: 6,
                shadowColor: '#6D825A'

            },
            hoverable: false
        }));
    }, 1000);

    return zr;
}
module.exports = pointRadian;