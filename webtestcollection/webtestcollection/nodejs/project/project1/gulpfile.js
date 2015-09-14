var gulp = require('gulp'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    del = require('del'),
    markdown = require('gulp-markdown'),
    data = require("gulp-data"),
    template = require('gulp-template'),
    livereload = require('gulp-livereload'),
    uglify = require('gulp-uglify'),
    minifycss = require('gulp-minify-css'),
    conf=JSON.parse(require("fs").readFileSync("package.json"));

if(!conf.src){
    conf.src="../html_new"; //默认源码位置
}
if(!conf.dist){
    conf.dist="../html_new/assets"; //默认发布位置
}

gulp.task('clean', function () {
    del.sync(conf.dist+'/**',{force:true});
});

gulp.task('clean-css', function () {
    del.sync(conf.dist+'/css/**',{force:true});
});

gulp.task('clean-i18n', function () {
    del.sync(conf.dist+'/i18n/**',{force:true});
});

gulp.task('clean-img', function () {
    del.sync(conf.dist+'/aries/css/base/img/**',{force:true});
});

gulp.task('clean-font', function () {
    del.sync([
        conf.dist+'/aries/css/base/font/**',
        conf.dist+'/aries/css/ext/font/**'
    ],{force:true});
});

gulp.task('clean-js', function () {
    del.sync([
        conf.dist+'/i18n/**',
        conf.dist+'/aries/main/**',
        conf.dist+'/aries/lib/**'
    ],{force:true});
});

gulp.task('clean-conf', function () {
    del.sync(conf.dist+'/aries/config/**',{force:true});
});

gulp.task('clean-assets72', function () {
    del.sync(conf.src+'/assets72/**',{force:true});
});

function getCSSList(){
    var srcDir=conf.src+"/css/base";

    return [
        srcDir+"/bootstrap.css",
        srcDir+"/font-awesome.css",
        srcDir+"/font-icomoon.css",
        srcDir+"/b-base.css",
        srcDir+"/b-tab.css",
        srcDir+"/b-form.css",
        srcDir+"/b-calendar.css",
        srcDir+"/b-popup.css",
        srcDir+"/b-menu.css",
        srcDir+"/b-alert.css",
        srcDir+"/b-table.css",
        srcDir+"/b-switch.css",
        srcDir+"/b-btn.css",
        srcDir+"/b-page.css",
        srcDir+"/b-wizard.css",
        srcDir+"/b-tree.css",
        srcDir+"/b-panel.css",
        srcDir+"/b-progress.css",
        srcDir+"/b-title.css",
        srcDir+"/b-grid.css"
    ];
}

function procCSS(){
    var distDir=conf.dist+"/aries/css/base";

    return gulp.src(getCSSList())
        .pipe(concat("aries-base.css"))
        .pipe(gulp.dest(distDir))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest(distDir));
}

gulp.task('proc-css', ["clean-css"],function () {
    return procCSS();
});

gulp.task('proc-css-no-clean', function () {
    return procCSS();
});

gulp.task('proc-js',["clean-js","proc-js-i18n","proc-js-main","proc-js-lib","proc-js-load-lib","proc-js-base-lib","proc-js-ui-lib"]);

gulp.task('proc-js-no-clean',["proc-js-i18n","proc-js-main","proc-js-lib","proc-js-load-lib","proc-js-base-lib","proc-js-ui-lib"]);

gulp.task("proc-js-i18n",function(){
    var srcDir=conf.src+"/aries/i18n",
        distDir=conf.dist+"/i18n";

    return gulp.src([
        srcDir+"/crm_resource.zh_CN.js",
        srcDir+"/crm_resource.en_US.js"
    ]).pipe(gulp.dest(distDir));
});

gulp.task("proc-js-lib", function () {
    var srcLibDir=conf.src+"/aries/lib",
        srcCoreDir=conf.src+"/aries/core",
        distDir=conf.dist+"/aries/lib";

    return gulp.src([
        srcLibDir+"/**/*.js",
        srcCoreDir+"/aries-core.js",
        srcCoreDir+"/aries-core-require-before.js",
        srcCoreDir+"/aries-core-require-after.js"
    ]).pipe(rename(function(path){
        if(path.basename==="aries-core-require-before"){
            path.basename="aries-require-before";
        }else if(path.basename==="aries-core-require-after"){
            path.basename="aries-require-after";
        }
    })).pipe(gulp.dest(distDir));
});

gulp.task("proc-js-load-lib",function(){
    var srcCoreDir=conf.src+"/aries/core",
        srcExtDir=conf.src+"/aries/ext",
        distDir=conf.dist+"/aries/lib";

    return gulp.src([
        srcCoreDir+"/aries-core-load.js",
        srcExtDir+"/aries-ext-cookie.js",
        srcExtDir+"/aries-ext-json.js"
    ])
        .pipe(concat("aries-load.js"))
        .pipe(gulp.dest(distDir))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(distDir));
});

gulp.task("proc-js-base-lib",function(){
    var srcCoreDir=conf.src+"/aries/core",
        distDir=conf.dist+"/aries/lib";

    return gulp.src([
        srcCoreDir+"/aries-core-public.js",
        srcCoreDir+"/aries-core-ajax.js",
        srcCoreDir+"/aries-core-data.js",
        srcCoreDir+"/aries-core-page.js"
    ])
        .pipe(concat("aries-base.js"))
        .pipe(gulp.dest(distDir))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(distDir));
});

function getUIJSList(){
    var srcUICoreDir=conf.src+"/aries/ui/core",
        srcUIFunDir=conf.src+"/aries/ui/function",
        srcUIWinDir=conf.src+"/aries/ui/window",
        srcUIFormsDir=conf.src+"/aries/ui/forms",
        srcUILayoutDir=conf.src+"/aries/ui/layout",
        srcUIWidgetsDir=conf.src+"/aries/ui/widgets";

    return [
        srcUICoreDir+"/ui-core.js",
        srcUICoreDir+"/ui-widget.js",
        srcUICoreDir+"/ui-mouse.js",
        srcUICoreDir+"/ui-resizable.js",
        srcUICoreDir+"/ui-position.js",
        srcUIFunDir+"/ui-draggable.js",
        srcUIFunDir+"/ui-droppable.js",
        srcUIFunDir+"/ui-sortable.js",
        srcUIWinDir+"/ui-dialog.js",
        srcUIFormsDir+"/ui-calendar.js",
        srcUIFormsDir+"/ui-checkbox.js",
        srcUIFormsDir+"/ui-combo.js",
        srcUIFormsDir+"/ui-radio.js",
        srcUIFormsDir+"/ui-search.js",
        srcUIFormsDir+"/ui-textarea.js",
        srcUIFormsDir+"/ui-textfield.js",
        srcUIFormsDir+"/ui-textpopup.js",
        srcUIFormsDir+"/ui-flip.js",
        srcUIFormsDir+"/ui-advcombo.js",
        srcUILayoutDir+"/ui-panel.js",
        srcUILayoutDir+"/ui-tabs.js",
        srcUILayoutDir+"/ui-offCanvas.js",
        srcUILayoutDir+"/ui-irguide.js",
        srcUILayoutDir+"/ui-guide.js",
        srcUIWidgetsDir+"/ui-menu.js",
        srcUIWidgetsDir+"/ui-menutree.js",
        srcUIWidgetsDir+"/ui-validate.js",
        srcUIWidgetsDir+"/ui-form.js",
        srcUIWidgetsDir+"/ui-progressbar.js",
        srcUIWidgetsDir+"/ui-tree.js",
        srcUIWidgetsDir+"/ui-breadcrumb.js",
        srcUIWidgetsDir+"/ui-grid.js",
        srcUIWidgetsDir+"/ui-pageflow.js",
        srcUIWidgetsDir+"/ui-tpl.js",
        srcUIWidgetsDir+"/ui-messagebox.js",
        srcUIWidgetsDir+"/ui-slider.js",
        srcUIWidgetsDir+"/ui-popup.js",
        srcUIWidgetsDir+"/ui-tips.js",
        srcUIWidgetsDir+"/ui-import.js",
        srcUIWidgetsDir+"/ui-toggle.js"
    ];
}

gulp.task("proc-js-ui-lib",function(){
    var distDir=conf.dist+"/aries/lib";

    return gulp.src(getUIJSList())
        .pipe(concat("aries-ui.js"))
        .pipe(gulp.dest(distDir))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(distDir));
});

gulp.task("proc-js-main",function(){
    var srcMainDir=conf.src+"/aries/main/**",
        distDir=conf.dist+"/aries/main";

    return gulp.src(srcMainDir).pipe(gulp.dest(distDir));
});

function procImg(){
    var srcDir=conf.src+"/css/base/img/**",
        distDir=conf.dist+"/aries/css/base/img";

    return gulp.src(srcDir).pipe(gulp.dest(distDir));
}

gulp.task('proc-img-no-clean', function () {
    return procImg();
});

gulp.task('proc-img',["clean-img"], function () {
    return procImg();
});

function procFont(){
    var distDir=conf.dist+"/aries/css/base/font";

    return gulp.src([
        conf.src+"/css/base/font/**",
        conf.src+"/css/ext/font/**"
    ]).pipe(gulp.dest(distDir));
}

gulp.task('proc-font-no-clean', function () {
    return procFont();
});

gulp.task('proc-font',["clean-font"], function () {
    return procFont();
});

function procConf(){
    var srcDir=conf.src+"/aries/config/**",
        distDir=conf.dist+"/aries/config";

    return gulp.src(srcDir).pipe(gulp.dest(distDir));
}

gulp.task('proc-conf-no-clean', function () {
    return procConf();
});

gulp.task('proc-conf',["clean-conf"], function () {
    return procConf();
});

//gulp.task('proc-docs', function () {
//    return gulp.src('./CHANGE_LOG.md').pipe(markdown({
//        highlightTheme: "monokai_sublime",
//        gfm: true,
//        tables: true,
//        sanitize: false
//    })).pipe(data(function (file) {
//        var content = String(file.contents),
//            currentDate = new Date(),
//            now = currentDate.getFullYear().toString()+"/"+(currentDate.getMonth()+1).toString()+"/"+currentDate.getDate().toString();
//
//        return gulp.src("./welcome.tmpl").pipe(template({
//            version: conf.version,
//            date: now,
//            change_log:content})).pipe(rename("welcome.html")).pipe(gulp.dest(conf.src+"/docs"));
//    }));
//});

function procAssets72(){
    return gulp.src(conf.dist+"/**").pipe(gulp.dest(conf.src+"/assets72"));
}

gulp.task('proc-assets72-no-clean', function () {
    return procAssets72();
});

gulp.task('proc-assets72',["clean-assets72"], function () {
    return procAssets72();
});

gulp.task("default",["clean","proc-css-no-clean","proc-js-no-clean","proc-img-no-clean","proc-font-no-clean","proc-conf-no-clean","proc-assets72-no-clean"]);

gulp.task("watch",function(){
    gulp.watch(conf.src+"/css/**",'proc-css');
    gulp.watch(conf.src+"/aries/config/**",['proc-conf']);
    gulp.watch(conf.src+"/aries/core/**",['proc-js']);
    gulp.watch(conf.src+"/aries/ext/**",['proc-js-load-lib']);
    gulp.watch([
        conf.src+"/css/base/font/**",
        conf.src+"/css/ext/font/**",
        conf.src+"/css/base/img/**"
    ],['proc-font']);
    gulp.watch([
        conf.src+"/css/base/img/**"
    ],['proc-img']);
    gulp.watch(conf.src+"/aries/ui/**",['proc-js-ui-lib']);
    gulp.watch(conf.src+"/aries/i18n/**",['proc-js-i18n']);
    gulp.watch(conf.src+"/aries/main/**",['proc-js-main']);
    gulp.watch(conf.src+"/aries/lib/**",['proc-js-lib']);

    livereload.listen();
    gulp.watch([conf.dist+'/**']).on('change', livereload.changed);
});