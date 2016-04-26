/**
 * zrender扩展
 * @module zrender
 * @author zw (赵伟, 1512763623@qq.com)
 */

var Group = require('./../../zrender/Group');
var LineShape = require('./../../zrender/shape/Line');
var TextShape = require('./../../zrender/shape/Text');


/**
 * （坐标轴）Axis构造函数
 * @class Axis（坐标轴）
 * @constructor
 * @example
 *      var axisY = new Axis().createY(10, scaleY);
 *      var axisX = new Axis().createX(arr, scaleX);
 *      axisY.position = [margin.left, margin.top];
 *      axisX.position = [margin.left, margin.top + height];
 *
 *
 */
function Axis() {
    this.obj = new Group();
}
Axis.prototype = {
    /**
     *创建Y坐标
     * @method createY
     * **/
    createY: function (sum, scale) {
        this.sum = sum;

        //创建Y轴坐标线不包括坐标数据和点
        this.obj.addChild(new LineShape({
            style: {
                xStart: 0,
                yStart: 0,
                xEnd: 0,
                yEnd: scale.range.max,
                strokeColor: 'rgba(0,0,0,1)',
                lineWidth: 1,
                lineType: 'solid'
            }
        }));

        //section是定义域范围内分段的每一段的大小
        var i = 0, section = (scale.domain.max - scale.domain.min) / this.sum;

        //for循环Y轴分段数，创建对应shape
        for (; i <= this.sum; i++) {
            this.obj.addChild(new LineShape({
                style: {
                    xStart: -5,
                    yStart: scale.getRange(i * section),
                    xEnd: 0,
                    yEnd: scale.getRange(i * section),
                    strokeColor: 'rgba(0,0,0,1)',
                    lineWidth: 1,
                    lineType: 'solid'
                }
            }));
            this.obj.addChild(new TextShape({
                style: {
                    x: -20,
                    y: scale.getRange(i * section),
                    maxWidth: 15,
                    color: 'rgba(0, 0, 0, 1)',
                    text: i * section,
                    textFont: '12px 微软雅黑'
                }
            }));
        }
        return this.obj;
    },
    /**
     *创建X坐标
     * @method createX
     * **/
    createX: function (arr, scale) {
        this.sum = arr.length;

        //section是定义域范围内分段的每一段的大小
        var i = 0, section = (scale.range.max - scale.range.min) / this.sum;

        //创建Y轴坐标线不包括坐标数据和点
        this.obj.addChild(new LineShape({
            style: {
                xStart: 0,
                yStart: 0,
                xEnd: scale.range.max - scale.range.min,
                yEnd: 0,
                strokeColor: 'rgba(0,0,0,1)',
                lineWidth: 1,
                lineType: 'solid'
            }
        }));
        //for循环Y轴分段数，创建对应shape
        for (; i <= this.sum; i++) {
            this.obj.addChild(new LineShape({

                style: {
                    xStart: scale.getRange(i + 0.5),
                    yStart: 0,
                    xEnd: scale.getRange(i + 0.5),
                    yEnd: 5,
                    strokeColor: 'rgba(0,0,0,1)',
                    lineWidth: 1,
                    lineType: 'solid'
                }
            }));
            this.obj.addChild(new TextShape({
                style: {
                    x: scale.getRange(i + 0.5),
                    y: 15,
                    textAlign: 'center',
                    color: 'rgba(0, 0, 0, 1)',
                    text: arr[i],
                    textFont: '12px 微软雅黑'
                }
            }));

        }
        return this.obj;
    }
};

module.exports=Axis;