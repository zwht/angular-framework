var md = require("../module/common");
md.service("commonService", commonService);

commonService.$inject = ["$resource"];

function commonService($resource) {
    //2.8.2.5.1查询章节布置作业情况/exerhome/question/sectiondetail
    this.detailSection = $resource("rest/exerhome/question/sectiondetail/:studentId/:sectionId/:pageNum/:pageSize");

    //2.8.2.4.1	新建作业/exerhome/create
    this.homeworkCreate = $resource("rest/exerhome/create", {}, {
        save: {
            method: "POST"
        }
    });

    //2.8.2.2.1	老师当前所教班级信息查询/class/search
    this.classSearch = $resource("rest/class/search");
}
