var Metalsmith = require("metalsmith");
var markdown = require("metalsmith-markdown");
var asciidoctor = require("metalsmith-asciidoctor");
var less = require("metalsmith-less");
var ignore = require("metalsmith-ignore");
var assets = require("metalsmith-static");
var excerpts = require('metalsmith-better-excerpts');
var news = require('./lib/metalsmith/news');
var handlebars = require('./lib/metalsmith/handlebars');
var argv = require("yargs").argv;
var versions = require("./conf/versions.json");
var helpers = require("./lib/helpers");

// basic Metalsmith setup
var metalsmith = Metalsmith(__dirname)
    .metadata({
      versions: versions
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
 * Transform Asciidoc files to HTML
 */
metalsmith.use(asciidoctor({
  pattern: "**/*.adoc",
  options: {
    attributes: {
      "icons": "font"
    }
  }
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
 * Apply template to get a full HTML page. You can choose which 
 * template to use using the "template" header property.
 */
metalsmith.use(handlebars({
  pattern: "**/*.html",
  directory: "_templates",
  helpers: helpers
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
  "**/*.less",
  "_templates/**"
]));

/*
 * Copy assets which shouldn't be processed by the pipeline. This
 * is useful for including stuff from "node_modules" in the site.
 */
metalsmith.use(assets([
  {
    "src": "assets",
    "dest": "."
  },
  {
    "src": "node_modules/font-awesome/fonts",
    "dest": "fonts"
  }
]));

/*
 * Run the build
 */
metalsmith.build(function (err) {
  if (err) {
    throw err;
  }
});
