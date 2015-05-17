# Atra
[Project Atra](http://atra.herokuapp.com/), a realtime portfolio

Made with node.js and hosted on Heroku

## Requirements
* [node.js](https://nodejs.org/) _including npm_

## Setup
You must first install the required modules with the following command.

    npm install

Afterwards run the app like so.

    node index.js

The app will be running at the following url.

    http://localhost:5000

## API
The app has a couple of API exposed functionalities. You can use these through an an API client like [Chrome's Advanced REST client](https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo).


#### List all users
    GET http://localhost:5000/api/users

#### Add user
    POST http://localhost:5000/api/users
    {
        'email' : 'larry@example.com',
        'first_name' : 'Larry',
        'last_name' : 'Page',
        'password' : 'open'
    }
