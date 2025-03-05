const { src, dest, series, parallel, watch } = require("gulp")
const replace = require("gulp-replace");

const globs = {
    html: "*.html",
    css: "Css/style.css",
    img: "images/*"
}


const htmlmin = require("gulp-html-minifier-terser");

function htmlTask() {
    return src(globs.html)
        .pipe(replace(/<link\s+rel=["']stylesheet["']\s+href=["'].*?["']>/g, '<link rel="stylesheet" href="Css/style.min.css">'))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest("dist"));
}


const concat = require("gulp-concat")
const cleanCSS = require('gulp-clean-css');

function cssTask() {
    return src(globs.css)
        .pipe(concat("style.min.css"))
        .pipe(cleanCSS())
        .pipe(dest("dist/Css"));
}


const optimizeImages = require("gulp-optimize-images");


function imgTask() {
    return src(globs.img, { encoding: false })
        .pipe(optimizeImages({
            compressOptions: {
                png: { quality: 60 }
            }
        }))
        .pipe(dest('dist/images'))
}


function watchTask() {
    watch(globs.html, htmlTask)
    watch(globs.css, cssTask)
    watch(globs.img, imgTask)
}


exports.default = series(parallel(htmlTask, cssTask, imgTask), watchTask)
