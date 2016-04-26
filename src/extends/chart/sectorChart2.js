function sectorChart2(json) {


    var element = json.element;
    var data = json.data;
    var r = element.offsetWidth > element.offsetHeight ? element.offsetHeight / 2 : element.offsetWidth / 2;

    var r0 = r - parseInt(r / 3);
    var lineWidth = parseInt(r / 20);
    r -= lineWidth;
    var zrColor = ["#f7b537", "#e4e8f0"];


    var zrender = require("./../zrender/zrender");
    var SectorShape = require("./../zrender/shape/Sector");
    var TextShape = require('./../zrender/shape/Text');


    var zr = zrender.init(element);
    zr.clear();
    var i = 0, length = data.length;

    //数据求和
    var total = 0;
    for (i = 0; i < length; i++) {
        total += data[i];
    }


    var percent;
    var startAngle = 90, endAngle = 0;
    var x = Math.round(zr.getWidth() / 2);
    var y = Math.round(zr.getHeight() / 2);


    var textShapeStyle = {
        brushType: 'fill',
        text: (data[0] / total * 100).toFixed(0),
        textFont: 'bold '+r/2+'px verdana'
    };
    var textShape1Style = {
        brushType: 'fill',
        text: '%',
        textFont: 'bold '+r/6+'px verdana'
    };
    var ts = new TextShape();
    var textShapeRect = ts.getRect(textShapeStyle);
    var textShape1Rect = ts.getRect(textShape1Style);
    var c = textShapeRect.width + textShape1Rect.width;


    var textShape = new TextShape({
        style: {
            x: x - c / 2,
            y: y,
            brushType: 'fill',
            text: (data[0] / total * 100).toFixed(0),
            textFont: 'bold '+r/2+'px verdana'
        },
        hoverable:false
    });
    var textShape1 = new TextShape({
        style: {
            x: x - c / 2 + textShapeRect.width,
            y: y + r/10,
            brushType: 'fill',
            text: "%",
            textFont: 'bold '+r/6+'px verdana'
        },
        hoverable:false
    });


    var sectorShapeList = [];
    for (i = 0; i < data.length; i++) {

        percent = data[i] / total;
        endAngle = (percent * 360 + startAngle).toFixed(2) - 0;

        //创建扇形
        sectorShapeList[i] = new SectorShape({
            style: {
                brushType: "both",
                x: x,
                y: y,
                r0: r0,
                r: r,
                lineWidth: lineWidth,
                strokeColor: "#FFF",
                startAngle: startAngle,
                endAngle: endAngle,
                color: zrColor[i]
            },
            highlightStyle: {
                lineWidth: 0
            }
        });
        startAngle = endAngle;
    }

    for (i = 0; i < data.length; i++) {
        zr.addShape(sectorShapeList[i]);
    }
    zr.addShape(textShape);
    zr.addShape(textShape1);
    zr.render();
    return zr;
}
module.exports = sectorChart2;