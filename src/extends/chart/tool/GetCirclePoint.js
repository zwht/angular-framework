/**
 * @module zrender
 * **/



/**
 * GetCirclePoint（得到圆上点坐标）
 * @class GetCirclePoint
 * @constructor
 * @param {object} json 传一个json{angle:,r:,x:,y:}。返回一个json{x:,y:}对应点的坐标
 * @example
 *      var point=GetCirclePoint({
 *                  angle:angle,
 *                  r:r,
 *                 x:x,
 *                 y:y
 *           });
 */
function GetCirclePoint(p) {
    var angle = p.angle%360, r = p.r, x = p.x, y = p.y;
    var x1 = Math.sin(Math.PI / 180 * angle) * r;
    var y1 = Math.cos(Math.PI / 180 * angle) * r;
    var point = {};
    if (0 <= angle && angle <= 90) {
        point.x = x + y1;
        point.y = y - x1;
    } else if (90 < angle && angle <= 180) {
        point.x = x + y1;
        point.y = y - x1;
    } else if (180 < angle && angle <= 270) {
        point.x = x + y1;
        point.y = y - x1;
    } else if (270 < angle && angle <= 360) {
        point.x = x + y1;
        point.y = y - x1;
    }
    return point;
}
module.exports = GetCirclePoint;