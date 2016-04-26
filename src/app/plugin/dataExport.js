/**
/* @module plugins
* change log
* version 0.0.1   2015-02-05
* 简单的数组、对象导出，期待添加表达式运算，路径回返
*/
var md=angular.module("dataExport",[]);
md.provider("dataExport",dataExport);

/**
 * 
 *  根据给定的规则，重新生成对象

 *
 *  @class dataExport 数据导出
 */
function dataExport(){

    this.$get=[function(){

        return{"exp":exportFn};
        /**
         *  var data={data:[{name:"jiang",size:"count",address:[{phone:"123456"}]},{name:"pp",size:"count",address:[{phone:"787897"}]}]};
         *
         *  eg.原式数据模拟的是一个api返回的数据,数组放在json的data键中，且每个数组中嵌套类一个address数组。如果现实情况下我们
         *  需要一个统一格式的数据比如[{name:"",phone:""}]
         *
         *  我们可以使用下面的配置首先声明我们要导出的是一个数组
         *  那么配置以数组[] 包围，数组的第一个是数组所要取的数据路径这里是取data
         *  ['data']
         *
         *  数组的第2个是数组下面对象的取值路径
         *
         *  ['data',{name:"name",phone:"address/0/phone"}]
         * 导出后的数据为
         * [{name:"jiang",phone:"123456"},{name:"pp",phone:"787897"}]
         * 
         * @method export 导出数据
         *
         * @param {Object} 输入数据
         * @param {Object} 配置
         */
        function exportFn(data,config){
            return travel(data,config);
        }

        //解析路径
        function parsePath(path,exp){
            var regExp=new RegExp("\\.\\/|(\\.\\./)+)[0-9,a-Z]+");
            if(regExp.math(exp)){
                exp.replace(".","/");
                if(exp.indexOf("./")===0){
                    exp=exp.substring(2);
                }
                while(exp.indexOf("../")==1||path.index("/")!=-1){
                    path=path.substring(0,path.lastIndexOf("/"));
                    exp=exp.substring(3);
                }
                return path+"/"+exp;

            }
        }

        function getValue(data,path){
            path=path.split("/");
            var current=data;
            for(var i=0;current&&i<path.length;i++){
                var p=path[i];
                if(p&&current[p]!==undefined){
                    current=current[p];
                }else if(p==="."){
                    current=current;
                }else if(p){
                    current=undefined;
                }
            }
            return current;
        }

        function travel(root,config,path){
            var current=root;
            var result={};
            if(angular.isArray(config)){
                result=[];
                //获取数组导出时，相对的路径的对应的值
                if(angular.isString(config[0])){
                    current=getValue(current,config[0]);
                }
                if(angular.isArray(current)){
                    result=[];
                    angular.forEach(current,function(v,i){
                        var dt=travel(v,config[1],path+i);
                        result.push(dt);
                    });
                }else if(angular.isObject(current)){

                    var dt=travel(current,config[1]);
                    result.push(dt);
                }else{
                    result.push(null);
                }
            }else if(angular.isObject(config)){
                angular.forEach(config,function(v,k){
                    current=root;
                    var path=v;
                    if(angular.isString(path)){
                        dt=getValue(current,path);
                        result[k]=dt;
                    }else if(angular.isObject(path)){
                        var dt=travel(current,path);
                        result[k]=dt;
                    }else if(angular.isFunction(path)){
                        result[k]=path.call(current,current);
                    }
                });
            }

            return result;

        }

    }];

}

module.exports=md;
