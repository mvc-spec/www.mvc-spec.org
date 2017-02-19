var Metalsmith = require("metalsmith");
var markdown = require("metalsmith-markdown");
var layouts = require("metalsmith-layouts");
var less = require("metalsmith-less");
var ignore = require("metalsmith-ignore");
var assets = require("metalsmith-static");
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');
var argv = require("yargs").argv;

// basic Metalsmith setup
var metalsmith = Metalsmith(__dirname)
    .metadata({
      // global template variables
    })
    .source('./src')
    .destination('./build')
    .clean(true);

// render markdown to HTML
metalsmith.use(markdown({
  // optional marked options
}));

// apply template to get a full HTML page
metalsmith.use(layouts({
  "engine": "handlebars",
  "pattern": "*.html",
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
      "layouts/**/*": true
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
