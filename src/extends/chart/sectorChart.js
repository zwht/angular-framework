function pieChart(json) {

    var element = json.element;
    var data = json.data;
    var r0 = json.r0;
    var r = json.r;

    //element.attr();
    var zrender = require("./../zrender/zrender");
    var zrColor = require("./../zrender/tool/color");
    var SectorShape = require("./../zrender/shape/Sector");
    var Ring = require('./../zrender/shape/Ring');
    var Rectangle = require('./../zrender/shape/Rectangle');
    var PathShape = require('./../zrender/shape/Path');
    var TextShape = require('./../zrender/shape/Text');

    var GetCirclePoint = require('./tool/GetCirclePoint');


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


    var pathShapeList = [];
    var sectorShapeList = [];
    var textShapeList = [];
    for (i = 0; i < data.length; i++) {

        percent = data[i] / total;
        endAngle = (percent * 360 + startAngle).toFixed(2) - 0;
        percent = (percent * 100).toFixed(2) + '%';

        //创建扇形
        sectorShapeList[i] = new SectorShape({
            style: {
                brushType: "both",
                x: x,          // 圆心横坐标
                y: y,          // 圆心纵坐标
                r0: r0,        // 圆环内半径
                r: r,          // 圆环外半径
                lineWidth: 10,
                strokeColor: "#FFF",
                startAngle: startAngle,
                endAngle: endAngle,
                color: zrColor.getColor(i)

            },
            highlightStyle: {
                lineWidth:0,
                text: percent,
                textAlign: "center",
                textColor: zrColor.getColor(i),
                textX: x,
                textY: y,
                textPosition: "specific",
                textBaseline: 'top'
                //textFont: 'normal 12px verdana'
            }
            //clickable: true,
            //onclick: sectorShapeClick
        });

        //创建扇形对应中点线段
        var angle = (startAngle + (endAngle - startAngle) / 2)%360;
        var point = GetCirclePoint({
            angle: angle,
            r: r-10,
            x: x,
            y: y
        });
        var point2 = GetCirclePoint({
            angle: angle,
            r: r + 30,
            x: x,
            y: y
        });

        var pathX = angle >= 90 && angle < 270 ? -30 : 30;
        var textX = angle >= 90 && angle < 270 ? -50 : 50;

        var paths = "M " + point.x + " " + point.y + " L " + point2.x + " " + point2.y + " L " + (point2.x + pathX) + " " + point2.y;
        pathShapeList[i] = new PathShape({
            style: {
                path: paths,
                brushType: "stroke",
                lineWidth: 1,
                strokeColor: zrColor.getColor(i)
            }
        });
        //创建对应数据text
        textShapeList[i] = new TextShape({
            style: {
                x: point2.x + textX,
                y: point2.y,
                brushType: 'fill',
                color: zrColor.getColor(i),
                text: percent,
                //textFont: 'bold 12px verdana',
                textAlign: "center",
                maxWidth: 35
            }
        });


        startAngle = endAngle;
    }

    for (i = 0; i < data.length; i++) {
        zr.addShape(sectorShapeList[i]);
        zr.addShape(pathShapeList[i]);
        zr.addShape(textShapeList[i]);


    }

    zr.render();
    function sectorShapeClick() {
        for (var j = 0; j < sectorShapeList.length; j++) {
            if (sectorShapeList[j].id !== this.id) {
                zr.animate(sectorShapeList[j].id, "style", false)
                    .when(100, {
                        x: x,
                        y: y
                    })
                    .start();
            }
        }
        var angle = this.style.startAngle + (this.style.endAngle - this.style.startAngle) / 2;
        var point = GetCirclePoint({
            angle: angle,
            r: 10,
            x: x,
            y: y
        });
        if (this.style.x !== x || this.style.y !== y) {
            point.x = x;
            point.y = y;
        }
        zr.animate(this.id, "style", false)
            .when(100, {
                x: point.x,
                y: point.y
            })
            .start();
        this.key = true;


    }

    return zr;
}
module.exports = pieChart;