const path = require("path");
const minimatch = require("minimatch");

const defaults = {
  pattern: "news/**",
  collection: "news",
  latestCount: 5
};

function plugin(opts) {
  return (files, metalsmith, done) => {

    const config = Object.assign({}, defaults, opts);

    const collection = [];

    Object.keys(files).forEach(currentName => {

      // ignore files not matching the pattern
      if (!minimatch(currentName, config.pattern)) {
        return;
      }

      // extract the date from the filename
      const basename = path.basename(currentName);
      const match = /^(\d+)-(\d+)-(\d+)-(.*)$/.exec(basename);
      if (match === null) {
        throw new Error("Unsupported file name: " + basename);
      }

      // create the full new name
      const newName = path.join(
          path.dirname(currentName),
          match[1], // year
          match[2], // month
          match[3], // day
          match[4]  // filename
      );

      // store path in file data
      const data = files[currentName];
      data.path = newName;
      data.date = `${match[1]}-${match[2]}-${match[3]}`;

      // rename the file
      files[newName] = data;
      delete files[currentName];

      // add to collection
      collection.push(data);

    });

    // order by date
    collection.sort((a, b) => b.date.localeCompare(a.date));

    // register collection in metadata
    metalsmith.metadata()[config.collection] = {
      all: collection,
      latest: collection.slice(0, config.latestCount)
    };

    // we are done
    setImmediate(done);

  }
}

module.exports = plugin;
