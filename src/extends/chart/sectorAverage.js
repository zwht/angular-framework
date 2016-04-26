function pieChart(json) {

    var element = json.element;
    var data = json.data;
    var color = json.color;
    var r0 = json.r0;
    var r = json.r;

    //element.attr();
    var zrender = require("./../zrender/zrender");
    var zrColor = require("./../zrender/tool/color");
    var SectorShape = require("./../zrender/shape/Sector");
    var Rectangle = require('./../zrender/shape/Rectangle');
    var TextShape = require('./../zrender/shape/Text');

    var GetCirclePoint = require('./tool/GetCirclePoint');


    var zr = zrender.init(element);

    zr.clear();
    //数据求和

    var percent;
    var startAngle = 90, endAngle = 0;
    var x = Math.round(zr.getWidth() / 2);
    var y = Math.round(zr.getHeight() / 2);

    var textShape = new TextShape({
        style: {
            x: x,
            y: y,
            brushType: 'fill',
            text: (data[0]).toFixed(),
            textFont: r / 2 + 'px verdana',
            textAlign:"center"
        },
        hoverable: false
    });
    zr.addShape(textShape);


    percent = data[0] / data[1];
    endAngle = (percent * 360 + startAngle).toFixed(2) - 0;


    //创建扇形
    zr.addShape(new SectorShape({
        style: {
            brushType: "both",
            x: x,          // 圆心横坐标
            y: y,          // 圆心纵坐标
            r0: r0,        // 圆环内半径
            r: r,          // 圆环外半径
            lineWidth: 0,
            strokeColor: "#FFF",
            startAngle: 0,
            endAngle: 360,
            color: "#E4E8F0"

        },
        hoverable:false
    }));

    zr.addShape(new SectorShape({
        style: {
            brushType: "both",
            x: x,          // 圆心横坐标
            y: y,          // 圆心纵坐标
            r0: r0,        // 圆环内半径
            r: r,          // 圆环外半径
            lineWidth: 0,
            strokeColor: "#FFF",
            startAngle: startAngle,
            endAngle: endAngle,
            color: color

        },
        hoverable:false
    }));


    zr.render();
    return zr;
}
module.exports = pieChart;