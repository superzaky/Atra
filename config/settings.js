var settings =
{
    'port' : process.env.PORT || 5000,
    'mongodb' : 'mongodb://atra:6wLC5KuRDUp9ZUGL@ds039271.mongolab.com:39271/atra',
    'public_folder' : '/src',
    'index_file' : '/src/app/app.html'
}

process.env.NODE_ENV = typeof process.env.NODE_ENV == 'undefined' ? 'development' : process.env.NODE_ENV.trim();

switch (process.env.NODE_ENV)
{
    case 'development':
        break;

    case 'staging':
        break;

    case 'production':
        settings.public_folder = '/build';
        settings.index_file = '/build/app.html';
        break;
}

module.exports = settings;
