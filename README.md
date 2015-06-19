# Atra
[Project Atra](http://atra.mistaegis.com/), a realtime portfolio

Made with node.js and hosted on Heroku

## Requirements
* [node.js](https://nodejs.org/)
* [npm](https://www.npmjs.com/) _comes with node.js_

##  Developer tools
* [bower](http://bower.io/) _package manager for the web_
* [grunt](http://gruntjs.com/) _for live reload_
* [vs code](https://code.visualstudio.com/) _editor of choice_
* [cmder](http://gooseberrycreative.com/cmder/) _includes mysisgit_

## Setup
You must first install the required modules with the following command.

    npm install

Afterwards run the app like so.

    node index.js

The app will be running at the following url.

    http://localhost:5000

You can enable live reloading with grunt.

    grunt watch

## API
The app has a couple of API exposed functionalities. You can use these through an an API client like [Chrome's Advanced REST client](https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo).
To see an overview of the API's, go to `http://localhost:5000/api`
