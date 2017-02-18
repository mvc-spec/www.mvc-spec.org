# mvc-spec.org

The source of https://www.mvc-spec.org

## Build the site

You will need  to have `node` and `npm` installed. First install all
the required npm dependencies:

    $ npm install

To build the site run:

    $ npm run build

The site will be built to the `./build/` directory.

## Development mode

If you are actively working on the site, you should follow this workflow.

First start the development server which serves the site:

    $ npm run serve

You can now point your browser to: [http://localhost:8080/](http://localhost:8080/)

Then open a new console add start watching the files for automatic rebuilding
on file modification:

    $ npm run watch

That's it! :)
