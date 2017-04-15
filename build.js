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

// render markdown to HTML
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

// evaluate template expressions in content files
metalsmith.use(inplace({
  "pattern": "**/*.html",
  "engine": "handlebars"
}));

// apply template to get a full HTML page
metalsmith.use(layouts({
  "engine": "handlebars",
  "pattern": "**/*.html",
  "default": "layout.html",
  "directory": "layouts",
  "partials": "layouts"
}));

// compile LESS files
metalsmith.use(less({
  "pattern": "css/style.less"
}));

// ignore some files, like the original LESS files
metalsmith.use(ignore([
  "**/*.less"
]));

// copy assets which shouldn't be processed by the pipeline
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
