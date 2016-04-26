function sectorChart3(json) {
    var element = json.element;
    var data = json.data;
    var data2 = json.data2;

    var tag = document.createElement("div");
    tag.className = "sectorChart3Tag";
    element.parentNode.appendChild(tag);
    element.onmouseout = function () {
        tag.style.display = "none";
    };

    var isPre = json.isPre;
    if (!data2) return;
    var windowWidth = window.innerWidth || document.body.clientWidth;

    var scaleKey = 0.36;
    if (windowWidth < 1200) {
        scaleKey = 0.3;
    }
    var accuracyKey = json.accuracyKey;
    var r = element.offsetWidth > element.offsetHeight ? element.offsetHeight * scaleKey : element.offsetWidth * scaleKey;
    var r0 = r - parseInt(r / 3);
    var lineWidth = parseInt(r / 20);
    r -= lineWidth;

    var zrColor = ["#6abb4f", "#4499bb", "#f7b537", "#bb4f4f"];
    //element.attr();
    var zrender = require("./../zrender/zrender");
    var SectorShape = require("./../zrender/shape/Sector");
    var Ring = require('./../zrender/shape/Ring');
    var Rectangle = require('./../zrender/shape/Rectangle');
    var TextShape = require('./../zrender/shape/Text');
    var ImageShape = require('./../zrender/shape/Image');
    var GetCirclePoint = require('./tool/GetCirclePoint');
    var Circle = require('./../zrender/shape/Circle');

    var zr = zrender.init(element);
    zr.clear();
    var i = 0, length = data.length;

    //数据求和
    var total = 0, max = {index: 0, data: data[0]};
    for (i = 0; i < length; i++) {
        total += data[i];
        if (data[i] > max.data) {
            max.data = data[i];
            max.index = i;
        }
    }
    if (!total) return;

    var percent;
    var startAngle = 90, endAngle = 0;
    var x = Math.round(zr.getWidth() / 2);
    var y = Math.round(zr.getHeight() / 2);

    var sectorShapeList = [];
    var textShapeList = [];
    var textShapeList1 = [];
    var cuntt = 0;
    for (i = 0; i < data.length; i++) {
        if (!data[i]) cuntt++;
    }

    function mouseHover(obj) {
        tag.style.display = "block";
        tag.style.top = ((obj.event.offsetY||obj.event.zrenderX) + 5) + "px";
        tag.style.left = ((obj.event.offsetX||obj.event.zrenderX) + 5) + "px";
        tag.innerHTML = "<p>本次得<span>" + obj.target.data[4] + "(" + obj.target.data[5] + ")</span>的学生<span>" + obj.target.data[0] + "</span>人</p><p>比上次<span>" + obj.target.data[3] + obj.target.data[2] + "</span>人</p>";
        if (obj.target.data[3] == "持平") {
            tag.innerHTML = "<p>本次得<span>" + obj.target.data[4] + "(" + obj.target.data[5] + ")</span>的学生<span>" + obj.target.data[0] + "</span>人</p><p>和上次<span>" + obj.target.data[3] + "</span></p>";
        }
        if (isPre) {
            tag.innerHTML = "<p>本次得<span>" + obj.target.data[4] + "(" + obj.target.data[5] + ")</span>的学生占比<span>" + obj.target.data[0] + "</span>%</p><p>比上次<span>" + obj.target.data[3] + obj.target.data[2] + "</span>%</p>";
            if (obj.target.data[3] == "持平") {
                tag.innerHTML = "<p>本次得<span>" + obj.target.data[4] + "(" + obj.target.data[5] + ")</span>的学生占比<span>" + obj.target.data[0] + "</span>%</p><p>和上次<span>" + obj.target.data[3] + "</span></p>";
            }
        }
    }

    var ylzc = ["优", "良", "中", "差"], ylzc1 = ["正确率：90%—100%", "正确率：80%—90%", "正确率：60%—80%", "正确率：0-60%"];
    for (i = 0; i < data.length; i++) {

        percent = data[i] / total;
        endAngle = (percent * 360 + startAngle).toFixed(2) - 0;
        percent = (percent * 100).toFixed(2) + '%';
        //创建扇形
        var sectorShapeJson = {
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
        };
        if (cuntt === 3) {
            sectorShapeList[i] = new Circle({
                style: {
                    x: x,
                    y: y,
                    r: r - (r - r0) / 2,
                    brushType: 'both',
                    color: '#FFF',
                    strokeColor: zrColor[i],
                    lineWidth: r - r0
                },
                hoverable: false,
                onmousemove: mouseHover,
                onmousedown:mouseHover
            });

            if (!data[i]) {
                sectorShapeList[i].position = [2000, 2000];
            }



        } else {
            sectorShapeList[i] = new SectorShape({
                style: sectorShapeJson,
                highlightStyle: {
                    lineWidth: 0
                },
                hoverable: false,
                onmousemove: mouseHover,
                onmousedown:mouseHover
            });

        }
        sectorShapeList[i]._index = i;

        //创建扇形对应中点线段
        var angle = (startAngle + (endAngle - startAngle) / 2) % 360;
        var point = GetCirclePoint({
            angle: angle,
            r: r * 1.05,
            x: x,
            y: y
        });

        var textAlign = "left";
        if (x > point.x) {
            textAlign = "right";
        }

        var ts = new TextShape(), charPre = "";
        if (isPre) charPre = "%";
        var ttt = "", ccc = "#6abb4f";
        if (data[i] - data2[i] > 0) {
            ttt = "↑" + (data[i] - data2[i]) + charPre;
            sectorShapeList[i].data = [data[i], data2[i], (data[i] - data2[i]), "增加", ylzc[i], ylzc1[i]];
        } else if (data[i] - data2[i] < 0) {
            ttt = "↓" + (data2[i] - data[i]) + charPre;
            sectorShapeList[i].data = [data[i], data2[i], (data2[i] - data[i]), "减少", ylzc[i], ylzc1[i]];
            ccc = "#bb4f4f";
        } else {
            ttt = "";
            sectorShapeList[i].data = [data[i], data2[i], "", "持平", ylzc[i], ylzc1[i]];
        }


        //创建对应数据text
        var dataText = data[i];
        if (!dataText) {
            dataText = "";
            ttt = "";
        } else {
            dataText += charPre;
        }
        var mm = (endAngle - startAngle) / 2 + startAngle;
        if (mm > 225 && mm < 315) point.y = point.y + 10;

        textShapeList[i] = new TextShape({
            style: {
                x: point.x,
                y: point.y,
                brushType: 'fill',
                color: zrColor[i],
                text: dataText,
                textFont: r / 5 + 'px verdana',
                textAlign: textAlign
            },
            hoverable: false
        });

        var textShapeRect = ts.getRect(textShapeList[i].style).width + 2;
        if (x > point.x) {
            textShapeRect = -textShapeRect;
        }

        textShapeList1[i] = new TextShape({
            style: {
                x: point.x + textShapeRect,
                y: point.y,
                brushType: 'fill',
                color: ccc,
                text: ttt,
                textFont: 'bold ' + r / 10 + 'px verdana',
                textBaseline: "bottom",
                textAlign: textAlign
            },
            hoverable: false
        });


        startAngle = endAngle;
    }

    for (i = 0; i < data.length; i++) {
        if(data[i]){
            zr.addShape(sectorShapeList[i]);
            zr.addShape(textShapeList[i]);
        }
        if (windowWidth < 1200) zr.addShape(textShapeList1[i]);
    }


    var src = "../assets/image/ionic/ico_";
    if (r > 100) src = "../assets/image/ionic/ico_0";

    var imageShape = new ImageShape({
        style: {
            x: x - r * 0.5,
            y: y - r * 0.5,
            //image : src+max.index+".png",
            image: src + accuracyKey + ".png",
            width: r,
            height: r
        }
    });
    zr.addShape(imageShape);
    zr.render();

    return zr;
}
module.exports = sectorChart3;