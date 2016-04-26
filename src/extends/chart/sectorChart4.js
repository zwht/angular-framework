function sectorChart4(json) {
    var element = json.element;
    var _index=json.index;
    var data = json.data;
    var r = element.offsetWidth > element.offsetHeight ? element.offsetHeight / 2 : element.offsetWidth / 2;

    var r0 = r - parseInt(r / 3);
    var lineWidth = parseInt(r / 20);
    r -= lineWidth;
    var zrColor = ["#6abb4f","#4499bb","#f7b537","#bb4f4f","#e4e8f0"];
    var texts=["优","良","中","差"];

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



    var textShape = new TextShape({
        style: {
            x: x,
            y: y,
            brushType: 'fill',
            text: texts[_index],
            textFont: r*0.7+'px verdana',
            textAlign:"center"
        },
        hoverable:false
    });



    var sectorShapeList = [];
    var zrC=[];
    for (i = 0; i < data.length; i++) {
        percent = data[i] / total;
        endAngle = (percent * 360 + startAngle).toFixed(2) - 0;
        if(endAngle===450) endAngle=449.9;
        zrC[0]=zrColor[_index];
        zrC[1]=zrColor[4];
        //创建扇形
        sectorShapeList[i] = new SectorShape({
            style: {
                brushType: "fill",
                x: x,
                y: y,
                r0: r0,
                r: r,
                strokeColor: "#FFF",
                startAngle: startAngle,
                endAngle: endAngle,
                color: zrC[i]
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
    zr.render();
    return zr;
}
module.exports = sectorChart4;