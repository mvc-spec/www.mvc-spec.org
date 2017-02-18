# mvc-spec.org [![Build Status](https://travis-ci.org/mvc-spec/www.mvc-spec.org.svg?branch=master)](https://travis-ci.org/mvc-spec/www.mvc-spec.org)

The source of https://www.mvc-spec.org

## Build the site

You will need  to have `node` and `npm` installed. First install all
the required npm dependencies:

    $ npm install

To build the site run:

    $ npm run build

The site will be built to the `./build/` directory.

## Development mode

If you are actively working on the site, you should use the development mode.

To start in development mode, start the script like this:

    $ npm run dev

You can now point your browser to: [http://localhost:4444/](http://localhost:4444/)

If you change any files, the development mode will automatically rebuild the site.

That's it! :)
