var md=angular.module("query",[]);

md.service('query', ["flag",function(flag){
    return function query(ele,selectors){

        if(angular.isString(ele)){
            selectors=ele;
            ele=document;
        }else if(angular.isElement(ele)){
            ele=ele[0];
        }
        ele=ele||document;
        if(!flag.ISOLD){
            return angular.element(ele.querySelectorAll(selectors));
        }else if(Sizzle){
            return angular.element(Sizzle(selectors,ele));
        }
    };
}]);

module.exports=md;