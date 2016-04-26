/**
 * @ngdoc module
 * @name backTop
 * @description
 * # backTop
 * 意见反馈
 *
 * ## Example
 *comment.init();
 */
var md = angular.module("comment", []);
md.provider("comment", comment);

function comment() {

    function search(key) { //从请求字符串里根据key找到value
        var value,search="";
        if(window.location.search.length > 0) {
            search = window.location.search;

        }else if(window.location.hash.length>0){
            var index=window.location.hash.indexOf("?");
            if(index!=-1){
                search=window.location.hash.substr(index);
            }
        }
        if(search.length > 0) {
            search = search.substr(1);
            var arr = search.split("&");
            for(var i = 0; i < arr.length; i++) {
                var tem = arr[i].split("=");
                if(tem.length > 1 && tem[0] === key) {
                    value = tem[1];
                }
            }
        }
        return value;
    }

	this.$get = ["$rootScope", "commonService", "query","$document", function ($rootScope, commonService, query,$document) {

		var oTop = angular.element("<div id='comment' class='comment'></div>");
		var changTab = angular.element("<div class='changTab'>意见反馈</div>");
		var close = angular.element("<div class='commentClose'><i class='icon icon-close'></i> </div>");
        var root = angular.element(document.body).css("position", "relative");
		var content = "<div class='commentContent'><h3>欢迎来到吐槽专区</h3><textarea id='commentTextarea'></textarea><div><button id='commentSubmit'>提交</button></div><div><div class='commentimg'>";
		if(!search("access_token")){
			content+="<a target='_blank' class='implant-client-hide' href='http://wpa.qq.com/msgrd?v=3&uin=690160918&site=qq&menu=yes'><img src='../../assets/image/common/qqcomment.png'/></a>";
		}
		content+="</div></div></div>";
		content=angular.element(content);

		var content = angular.element("<div class='commentContent'><h3>欢迎来到吐槽专区</h3><textarea id='commentTextarea'></textarea><div><button id='commentSubmit'>提交</button>" +
		"</div><div><div class='commentimg implant-client-hide'><a target='_blank' href='http://wpa.qq.com/msgrd?v=3&uin=690160918&site=qq&menu=yes'><img src='../../assets/image/common/qqcomment.png'/></a></div></div></div>");

		var commentSuccess=angular.element("<div class='commentSuccess'><img src='../../assets/image/homework/noSubmit.png'><p>感谢您的意见和建议，准小星必将认真处理！</p></div>");

		var createBackTop = {};
		createBackTop.init = function () {
            if(document.getElementById('question-print')) return false;
			//判断页面是否有id为backTop的标签，是就删除掉
			if (document.getElementById("comment")) document.getElementById("comment").remove();
			oTop.append(commentSuccess);
			oTop.append(content);
			oTop.append(changTab);
			oTop.append(close);
			root.append(oTop);

			changTab[0].onclick = function () {
				commentSuccess.css({display:"none"});
				content.css({display:"block"});
				if (oTop.hasClass("commentShow")) {
					oTop.removeClass("commentShow");
				} else {
					oTop.addClass("commentShow");
				}
			};
			close[0].onclick = function () {
				oTop.removeClass("commentShow");
			};


			document.getElementById("commentSubmit").onclick = function () {
				var commentTextarea = document.getElementById("commentTextarea").value;

				if (!commentTextarea) return;

				var sourceType="web_home",name="web家庭版";
				if($rootScope.teacher){
					sourceType="web_school";
					name="web校园版";
				}

				//console.log($rootScope);
				
				var p = {};
				if($rootScope.student){
					p = {
						accountId: $rootScope.studentId,
					pageUrl: document.location.href,
						//pageName: query($document,".title").text(),
						pageName: name,
					adviceContent: commentTextarea,
					sourceType:sourceType,
						classId:$rootScope.student.currClassId,
						schoolId:$rootScope.student.currSchoolId,
					callName:$rootScope.name
				};
				}else{
					p = {
						accountId: $rootScope.teacherId,
						pageUrl: document.location.href,
						//pageName: query($document,".title").text(),
						pageName: name,
						adviceContent: commentTextarea,
						sourceType:sourceType,
						classId:"",
						schoolId:$rootScope.teacher.currSchoolId,
						callName:$rootScope.name
					};
				}




				commonService.feedback.save(p, function (data) {
					if(data.success){
						commentSuccess.css({display:"block"});
						content.css({display:"none"});
                        document.getElementById("commentTextarea").value = '';
					}
				});

			};
		};
		return createBackTop;
	}];
}





