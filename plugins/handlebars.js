const path = require("path");
const minimatch = require("minimatch");
const Handlebars = require("handlebars");

const defaults = {
  pattern: "**/*.html",
  directory: "_templates"
};

function plugin(opts) {
  return (files, metalsmith, done) => {

    const metadata = metalsmith.metadata();

    const cfg = Object.assign({}, defaults, opts);

    Object.keys(files)
        .filter(fileName => minimatch(fileName, cfg.pattern))
        .forEach(fileName => {

          const fileData = files[fileName];

          let currentData = fileData;

          while (currentData.template) {

            // locate template
            const templateName = path.join(cfg.directory, currentData.template);
            const templateData = files[templateName];
            if (!templateData) {
              throw new Error("Cannot find template: " + templateName);
            }

            // compile template
            const template = Handlebars.compile(
                templateData.contents.toString()
            );

            // build the model
            const model = Object.assign({}, metadata, currentData, {
              contents: currentData.contents.toString()
            });

            // evaluate the model
            const result = template(model);

            // store result in file contents
            fileData.contents = new Buffer(result);
            currentData = templateData;

          }

        });

    // we are done
    setImmediate(done);

  }
}

module.exports = plugin;
