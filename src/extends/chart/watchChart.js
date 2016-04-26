function pieChart(json) {

    var element = json.element;
    var data = json.data;
    var r0 = json.r0;
    var r = json.r;

    var zrender = require("./../zrender/zrender");
    var zrColor = ["#4499bb","#FFF"];
    var SectorShape = require("./../zrender/shape/Sector");

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

    var sectorShapeList = [];
    var minKey=false;
    for (i = 0; i < data.length; i++) {

        percent = data[i] / total;
        if(minKey) percent=0.97;
        if(percent<0.01) {
            percent=0.01;
            minKey=true;
        }


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
                lineWidth: 0,
                strokeColor: "#FFF",
                startAngle: startAngle,
                endAngle: endAngle,
                color: zrColor[i]
            },
            hoverable: false

        });
        startAngle = endAngle;
    }

    for (i = 0; i < data.length; i++) {
        zr.addShape(sectorShapeList[i]);
    }

    //zr.render();
    return zr;
}
module.exports = pieChart;