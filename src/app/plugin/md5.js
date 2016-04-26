var md=angular.module("md5",[]);
var md5=require("MD5");
var sc=this;

md.service('md5', [function(flag){
    return function(str){
        return md5(str); 
    }
}])

module.exports=md;