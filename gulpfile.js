var path=require('path');
var gulp=require('gulp');
var del=require("del");//删除文件
var browserSync = require("browser-sync").create();//设置代理
var watchify = require('gulp-watchify');//watchify 加速 browserify 编译
var plumber=require("gulp-plumber");
var streamify = require('gulp-streamify');
var sourcemaps=require("gulp-sourcemaps");//js文件生成.map文件，调试定位到源码
var uglify=require("gulp-uglify");//js代码压缩
var seq=require("gulp-sequence");
var proxyMiddleware = require('http-proxy-middleware');
var cached = require("gulp-cached");
var jade = require("gulp-jade");//编译jade为html
var gulpif=require("gulp-if");//if判断，第一个参数为表达式，第二个参数为执行函数
var less = require("gulp-less");//编译less为css
var prefixer=require("gulp-autoprefixer");
var fontcss = require("gulp-iconfont-css");
var iconfont = require("gulp-iconfont");
var fe=require("gulp-foreach");

var babelify = require("babelify");
var collapse = require('bundle-collapser/plugin');   //reduce module path string;

var src=gulp.src("src/*.js");


var TYPE="DEV";
var FOLDER="tmp/";
var DEPLOY_FOLDER="build/";
var ENTRIES=["src/app/entries/*.js"];
var CSSMAIN=["src/assets/style/entries/*.less"];
var CSSDIR=["src/assets/style/**/*.less"];
var VIEWS=["src/views/**/*.jade"];
var IMAGES=["src/assets/image/**/*"];
var ICONS=["src/assets/icon/**/*.svg"];


var SERVER_PORT=1234;
var SERVER_PROXY = "http://www.iclassedu.com";

var config={
    watch:true,
    cache:{},
    packageCache: {},
    setup:function(bundle){
        bundle.transform('bulkify');
    }
};
var proxy = proxyMiddleware("/rest", {
    target: SERVER_PROXY,
    changeOrigin: true
});


//删除目录文件
gulp.task("clear",function(cb){
    console.log(cb);
    del([FOLDER],cb);
});
//把所有需要用到的js用cmd规范打包为一个js，配置在src/enter目录内部
gulp.task("bundle",watchify(function(wf){
    return gulp.src(ENTRIES)
        .pipe(plumber())
        .pipe(wf(config))
        .on("error",function(error){console.dir(error);this.emit('close');this.emit('end');})
        .pipe(streamify(plumber())) //fixed browserify update too early.
        .pipe(gulpif(TYPE=="DEPLOY",sourcemaps.init()))
        .pipe(gulpif(TYPE=="DEPLOY",uglify()))
        .pipe(gulpif(TYPE=="DEPLOY",sourcemaps.write("./")))
        .pipe(gulp.dest(FOLDER+"scripts"));
}));
gulp.task("compile-lib",function(){
    return gulp.src(["libs/**/*"])
        .pipe(gulp.dest(FOLDER+"libs"));
});

gulp.task("compile-views",function(){
    var config=(TYPE=='DEV')?{time:""}:{time:"?v="+new Date().getTime()};
    config.type=TYPE;
    return gulp.src(VIEWS)
        .pipe(cached("debug",{optimizeMemory:true}))
        .pipe(jade({locals:config}))
        .on("error",function(error){console.dir(error);this.emit('end');})
        .pipe(gulp.dest(FOLDER));
});

gulp.task("compile-style",function(){
    return gulp.src(CSSMAIN,{base:"src/assets/style/entries"})
        .pipe(less())
        .on("error",function(error){console.dir(error);this.emit('end');})
        .pipe(prefixer())
        .pipe(gulp.dest(FOLDER+"assets/style"));
});

gulp.task("compile-image",function(){
    return gulp.src(IMAGES,{base:"src"})
        .pipe(cached("debug",{optimizeMemory:true}))
        .pipe(gulp.dest(FOLDER));
});

gulp.task("compile-icon",function(){

    return gulp.src(ICONS,{base:"src"})
        .pipe(fontcss({
            fontName: "icon", path:"src/config/iconfont.css.tpl", targetPath: "icon.css"
        }))
        .pipe(iconfont({fontName: "icon",normalize:true}))
        .pipe(gulp.dest(FOLDER+"assets/icon"));
});

//compile icon to demo
gulp.task("create-demo",function(){
    var files=[];
    return gulp.src(ICONS)
        .pipe(fe(function(stream,file){
            var name=path.basename(file.path);
            files.push(name.replace(".svg",""));
            return stream;
        }))
        .on("finish",function(){
            gulp.src("src/views/page/demo/icon.jade")
                .pipe(jade({locals:{icons:files}}))
                .pipe(gulp.dest(FOLDER+"page/demo/"));
        });
});

gulp.task("watch",function(){
    gulp.watch(VIEWS,["compile-views"]);
    gulp.watch(CSSDIR,["compile-style"]);
    gulp.watch(IMAGES,["compile-image"]);
    gulp.watch(ICONS,["compile-icon","create-demo"]);
    //gulp.watch(JSS,["bundle"]);
    gulp.watch(FOLDER+"/**/*",{read:false}).on('change', function(event){
        browserSync.reload();
    });
});


gulp.task('default',["bundle","compile-views","compile-lib","compile-style","compile-image","compile-icon","create-demo"],function(){

});
gulp.task("dev",["default"],function(){
    console.log("##Starting Server.......");
    browserSync.init({
        //proxy:'http://172.16.40.53:',
        port:SERVER_PORT,
        //startPath:"http://172.16.40.53:9002/",
        ghostMode:false,
        server:FOLDER,
        middleware: [proxy]
    });
    gulp.start("watch");
});

gulp.task("server",seq("clear","dev"));

gulp.task("deploy",["clear"],function(){

    FOLDER=DEPLOY_FOLDER;
    TYPE="DEPLOY";
    //replace browerify config
    config={ watch:false, cache:{},packageCache: {},
        setup:function(bundle){
            bundle.transform('bulkify');
            bundle.transform(babelify);
            bundle.plugin(collapse);
        }
    };
    gulp.start("default");

})