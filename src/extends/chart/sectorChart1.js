function sectorChart1(json) {

    var element = json.element;
    var type = json.type;
    var data = json.data;
    var color = json.color || "#000";
    var ply = json.ply;
    var text = json.text;
    var r = element.offsetWidth > element.offsetHeight ? element.offsetHeight / 2 : element.offsetWidth / 2;
    var docWidth = document.documentElement.clientWidth || document.body.clientWidth;

    var r0 = r - parseInt(r / 3);
    if (ply) r0 = r - ply;

    var zrColor = ["#6abb4f", "#e4e8f0"];
    zrColor[0] = color;


    var zrender = require("./../zrender/zrender");
    var SectorShape = require("./../zrender/shape/Sector");
    var TextShape = require('./../zrender/shape/Text');
    var Circle = require('./../zrender/shape/Circle');
    var Group = require('./../zrender/Group');


    var zr = zrender.init(element);
    zr.clear();
    var i = 0, length = data.length;
    if (!length || !data) return;

    //数据求和
    var total = 0;
    for (i = 0; i < length; i++) {
        total += data[i];
    }

    var percent;
    var startAngle = 90, endAngle = 0;
    var x = Math.round(zr.getWidth() / 2);
    var y = Math.round(zr.getHeight() / 2);
    var minText, bigText = data[0];
    if (type === "percent") {
        minText = "%";
        bigText = (data[0] / (data[0] + data[1]) * 100).toFixed();
    } else {
        minText = "/" + total;
    }


    var textGroup = new Group();

    var textShapeStyle = {
        brushType: 'fill',
        text: bigText,
        textFont: r / 2 + 'px verdana'
    };
    var textShape1Style = {
        brushType: 'fill',
        text: "/" + total,
        textFont: r / 6 + 'px verdana'
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
            text: bigText,
            textFont: r / 2 + 'px verdana',
            color: color
        },
        hoverable: false
    });
    textGroup.addChild(textShape);

    var textShape1 = new TextShape({
        style: {
            x: x - c / 2 + textShapeRect.width,
            y: y + r / 10,
            brushType: 'fill',
            text: minText,
            textFont: 'bold ' + r / 6 + 'px verdana'
        },
        hoverable: false
    });
    textGroup.addChild(textShape1);
    var textShape2 = new TextShape({
        style: {
            x: x,
            y: y + 30,
            brushType: 'fill',
            text: text,
            textAlign: "center",
            textFont: 'bold ' + r / 8 + 'px verdana'
        },
        hoverable: false
    });

    if (type === "percent") {
        if (text && docWidth > 1114) textGroup.addChild(textShape2);
    } else {
        if (text && docWidth > 1358) textGroup.addChild(textShape2);
    }


    var lineWidth = parseInt(r / 20);
    r -= lineWidth;

    var circleGroup=new Group();
    for (i = 0; i < data.length; i++) {
        percent = data[i] / total;
        endAngle = (percent * 360 + startAngle).toFixed(2) - 0;
        percent = (percent * 100).toFixed(2) + '%';

        //判断是否只有一个数据的时候，用画圆来画圆弧
        if (!data[1] || !data[0]) {
            if (data[i]) {
                var shape = new Circle({
                    style: {
                        x: x,
                        y: y,
                        r: r - (r - r0) / 2,
                        brushType: 'both',
                        color: '#FFF',
                        strokeColor: zrColor[i],
                        lineWidth: r - r0
                    },
                    hoverable: false
                });
                circleGroup.addChild(shape);
            }
        } else {
            //创建扇形
            if (data[i]) {
                var sectorShape = new SectorShape({
                    style: {
                        brushType: "both",
                        x: x,          // 圆心横坐标
                        y: y,          // 圆心纵坐标
                        r0: r0,        // 圆环内半径
                        r: r,          // 圆环外半径
                        lineWidth: lineWidth,
                        strokeColor: "#FFF",
                        startAngle: startAngle,
                        endAngle: endAngle,
                        color: zrColor[i]
                    },
                    hoverable: false
                });
                circleGroup.addChild(sectorShape);
            }
        }
        startAngle = endAngle;
    }


    zr.addShape(circleGroup);
    zr.addShape(textGroup);
    zr.render();
    return zr;
}
module.exports = sectorChart1;