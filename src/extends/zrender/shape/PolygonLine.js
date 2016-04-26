/**
 * zrender
 *
 * @author Kener (@Kener-林峰, kener.linfeng@gmail.com)
 *
 * shape类：支持半平滑的polygon，折线面积图使用
 * 可配图形属性：
 {
     // 基础属性
     shape  : 'halfSmoothPolygon',      // 必须，shape类标识，需要显式指定
     id     : {string},       // 必须，图形唯一标识，可通过'zrender/tool/guid'方法生成
     zlevel : {number},       // 默认为0，z层level，决定绘画在哪层canvas中
     invisible : {boolean},   // 默认为false，是否可见
     // 样式属性，默认状态样式样式属性
     style  : {
         pointList     : {Array},   // 必须，多边形各个顶角坐标
     },
     // 样式属性，高亮样式属性，当不存在highlightStyle时使用基于默认样式扩展显示
     highlightStyle : {
         // 同style
     }
     // 交互属性，详见shape.Base
     // 事件属性，详见shape.Base
 }
 例子：
 {
     shape  : 'halfSmoothPolygon',
     id     : '123456',
     zlevel : 1,
     style  : {
         pointList : [[10, 10], [300, 20], [298, 400], [50, 450]]
         color : '#eee',
         text : 'Baidu'
     },
     myName : 'kener',  // 可自带任何有效自定义属性
     clickable : true,
     onClick : function (eventPacket) {
         alert(eventPacket.target.myName);
     }
 }
 */

var Base = require('./Base');
var zrUtil = require('../tool/util');
var smoothSpline = require('./util/smoothSpline');


function HalfSmoothPolygon(options) {
    Base.call(this, options);
}

HalfSmoothPolygon.prototype = {
    type: 'half-smooth-polygon',
    /**
     * 创建多边形路径
     * @param {Context2D} ctx Canvas 2D上下文
     * @param {Object} style 样式
     */
    buildPath: function (ctx, style) {
        var pointList = style.pointList;
        if (pointList.length < 2) {
            // 少于2个点就不画了~
            return;
        }
        if (style.smooth) {

            var l = pointList.length;
            ctx.moveTo(pointList[0][0], pointList[0][1]);
            var plist=zrUtil.clone(pointList);
            var t=plist.slice(0,l);
            var tt = smoothSpline(t, false,style.smoothMove);


            ctx.moveTo(plist[0][0], plist[0][1]);

            for (var i = 0; i < tt.length; i++) {
                ctx.lineTo(tt[i][0], tt[i][1]);
            }
            ctx.lineTo(pointList[0][0], pointList[0][1]);

            ctx.moveTo(plist[l - 1][0], plist[l - 1][1]);
            ctx.lineTo(plist[l - 2][0], plist[l - 2][1]);
            ctx.lineTo(plist[l - 1][0], plist[l - 1][1]);
            ctx.lineTo(plist[0][0], plist[0][1]);


        }
        else {
            require('./Polygon').prototype.buildPath(
                ctx, style
            );
        }
        return;
    }
};

require('../tool/util').inherits(HalfSmoothPolygon, Base);

module.exports = HalfSmoothPolygon;

        // if (style.smooth) {

        // }