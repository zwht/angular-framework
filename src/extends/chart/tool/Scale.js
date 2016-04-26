/**
 * @module zrender
 * **/




/**
 * （比例尺）Scale构造函数
 * @class Scale（比例尺）
 * @constructor
 * @example
 *      var scaleY = new Scale()
 *          .setDomain([0, 120])
 *          .setRange([height, 0]);
 *      var scaleX = new Scale()
 *          .setDomain(data.length)
 *          .setRange([0, width]);
 */
function Scale() {
    this.domain = {};
    this.range = {};
}
Scale.prototype = {
    /**
     *设置坐标尺定义域,<br>
     * 如果第一个参数是数组定义域范围是数组两个值的中间范围,<br>
     * 如果第一个参数不是数组，是数字，定义域范围是（0-参数值）
     * @method setDomain
     */
    setDomain: function () {
        if (arguments[0] instanceof Array) {
            this.domain.start = arguments[0][0];
            this.domain.end = arguments[0][1];
            if (arguments[0][0] > arguments[0][1]) {
                this.domain.min = arguments[0][1];
                this.domain.max = arguments[0][0];
            } else {
                this.domain.min = arguments[0][0];
                this.domain.max = arguments[0][1];
            }
        } else {
            this.domain.start=this.domain.min = 0;
            this.domain.end=this.domain.max = arguments[0];
        }

        return this;
    },
    /**
     *设置坐标尺值域
     * @method setRange
     * **/
    setRange: function (start, end) {
        if (arguments[0] instanceof Array) {
            this.range.start = arguments[0][0];
            this.range.end = arguments[0][1];
            if (arguments[0][0] > arguments[0][1]) {
                this.range.min = arguments[0][1];
                this.range.max = arguments[0][0];
            } else {
                this.range.min = arguments[0][0];
                this.range.max = arguments[0][1];
            }
        }

        return this;
    },
    /**
     *输入定义域一个值，输出值域对应值
     * @method getDomain
     * **/
    getDomain: function (pargm) {
        var d = this.domain.end - this.domain.start;
        var r = this.range.end - this.range.start;
        if (!(this.range.max >= pargm && pargm >= this.range.min)) return "参数不在值域内";
        var b = d / r;
        if (d < 0) return this.domain.max + b * (pargm - this.range.start);
        return b * (pargm - this.range.start) + this.domain.min;
    },
    /**
     *输入定义域一个值，输出值域对应值
     * @method getRange
     * **/
    getRange: function (pargm) {
        var d = this.domain.end - this.domain.start;
        var r = this.range.end - this.range.start;
        if (!(this.domain.max >= pargm && pargm >= this.domain.min)) return "参数不在定义域内";
        var b = r / d;
        if (r < 0) return this.range.max + b * (pargm - this.domain.start);
        return b * (pargm - this.domain.start) + this.range.min;
    }
};
module.exports=Scale;