var Metalsmith = require("metalsmith");
var markdown = require("metalsmith-markdown");
var layouts = require("metalsmith-layouts");
var less = require("metalsmith-less");
var ignore = require("metalsmith-ignore");
var assets = require("metalsmith-static");
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');
var inplace = require('metalsmith-in-place');
var excerpts = require('metalsmith-better-excerpts');
var news = require('./plugins/news');
var argv = require("yargs").argv;

// basic Metalsmith setup
var metalsmith = Metalsmith(__dirname)
    .metadata({
      versions: require("./metadata/versions.json")
    })
    .source('./src')
    .destination('./build')
    .clean(true);

/*
 * Transform Markdown files to HTML
 */
metalsmith.use(markdown({
  // optional marked options
}));

/*
 * Adds a 'excerpt' property to all pages. This will be used
 * to display excerpts for the news entries.
 */
metalsmith.use(excerpts({
  pruneLength: 100
}));

/*
 * This will process all the news entries in the 'news' directory,
 * extract the date from the file name, create a pretty URL for them 
 * and create two collections 'news.all' and 'news.latest' ordered 
 * by the entry date 
 */
metalsmith.use(news({
  pattern: "news/20*.html",
  collection: "news",
  latestCount: 3
}));

/*
 * Evaluate template expressions in content files. This is useful
 * for variables like "versions.spec.latest" which are defined
 * in "/metadata/*.json".
 */
metalsmith.use(inplace({
  "pattern": "**/*.html",
  "engine": "handlebars"
}));

/*
 * Apply template to get a full HTML page. You can choose which 
 * template to use using the "template" header property.
 */
metalsmith.use(layouts({
  "engine": "handlebars",
  "pattern": "**/*.html",
  "default": "layout.html",
  "directory": "layouts",
  "partials": "layouts"
}));

/*
 * Transform *.less files to *.css
 */
metalsmith.use(less({
  "pattern": "css/style.less"
}));

/*
 * There are some files in the "src" folder which we don't need in
 * the file site.
 */
metalsmith.use(ignore([
  "**/*.less"
]));

/*
 * Copy assets which shouldn't be processed by the pipeline. This
 * is useful for including stuff from "node_modules" in the site.
 */
metalsmith.use(assets([
  {
    "src": "assets",
    "dest": "."
  }
]));

// special plugins for development mode
if (argv.dev) {

  // serve the site on port 4444
  metalsmith.use(serve({
    port: 4444,
    verbose: true
  }));

  // watch relevant files for changes
  metalsmith.use(watch({
    paths: {
      "src/**/*": true,
      "assets/**/*": true,
      "layouts/**/*": "**/*"
    },
    livereload: true
  }));

}

// run the build
metalsmith.build(function (err) {
  if (err) {
    throw err;
  }
});
