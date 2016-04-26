function pieChart(json) {

    var element = json.element;
    var data = json.data;
    var color=json.color;
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
    var i = 0, length = data.length;

    //数据求和
    var total = 0, ggl = data[0];
    for (i = 0; i < length; i++) {
        total += data[i];
    }

    var percent;
    var startAngle = 90, endAngle = 0;
    var x = Math.round(zr.getWidth() / 2);
    var y = Math.round(zr.getHeight() / 2);


    var bigText=(ggl/total*100).toFixed();
    var textShapeStyle = {
        brushType: 'fill',
        text: bigText,
        textFont:  r / 2 + 'px verdana'
    };
    var textShape1Style = {
        brushType: 'fill',
        text: "%",
        textFont: r / 6 + 'px verdana'
    };
    var ts = new TextShape();
    var textShapeRect = ts.getRect(textShapeStyle);
    var textShape1Rect = ts.getRect(textShape1Style);
    var c = textShapeRect.width + textShape1Rect.width;

    if(!total) {
        zr.addShape( new TextShape({
            style: {
                x: x - c / 2,
                y: y,
                brushType: 'fill',
                text:"没有学生数据，无法计算分析！",
                color:"#c00",
                textColor:"#c00",
                textFont: '12px verdana'
            },
            hoverable: false
        }));
        zr.render();
        return zr;
    }

    var textShape = new TextShape({
        style: {
            x: x - c / 2,
            y: y,
            brushType: 'fill',
            text:bigText ,
            textFont:  r / 2 + 'px verdana'
        },
        hoverable: false
    });
    zr.addShape(textShape);

    var textShape1 = new TextShape({
        style: {
            x: x - c / 2 + textShapeRect.width,
            y: y + r / 10,
            brushType: 'fill',
            text: "%",
            textFont: 'bold ' + r / 6 + 'px verdana'
        },
        hoverable: false
    });
    zr.addShape(textShape1);


    var sectorShapeList = [],k= 0,z=0;
    for (i = 0; i < data.length; i++) {
        if(!data[i]) z++;
    }

    for (i = 0; i < data.length; i++) {

        percent = data[i] / total;
        endAngle = (percent * 360 + startAngle).toFixed(2) - 0;
        percent = (percent * 100).toFixed(2) + '%';

        k=i/1.2;
        var cc=zrColor.lift(color, -k);
        var lineWidth=1;
        if(z>2||data[i]===total) lineWidth=0;

        //创建扇形
        sectorShapeList[i] = new SectorShape({
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
                color:cc

            },
            highlightStyle: {
                lineWidth:0
            }
        });
        sectorShapeList[i].data=parseInt(data[i]/total*100);

        startAngle = endAngle;
        zr.addShape(sectorShapeList[i]);
    }

    zr.render();
    return zr;
}
module.exports = pieChart;