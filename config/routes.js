module.exports =
[
    { 'resource' : '/~',                  'method' : 'get',    'controller' : 'index',        'action' : 'info',             'args' : { } },
    { 'resource' : '/api',                'method' : 'get',    'controller' : 'index',        'action' : 'api',              'args' : { } },
    { 'resource' : '/api/login',          'method' : 'post',   'controller' : 'auth',         'action' : 'authorize',        'args' : { } },
    { 'resource' : '/api/logout',         'method' : 'get',    'controller' : 'auth',         'action' : 'unauthorize',      'args' : { } },
    { 'resource' : '/api/register',       'method' : 'get',    'controller' : 'auth',         'action' : 'register',         'args' : { } },
    { 'resource' : '/api/users',          'method' : 'get',    'controller' : 'user',         'action' : 'list',             'args' : { } },
    { 'resource' : '/api/users',          'method' : 'post',   'controller' : 'user',         'action' : 'add',              'args' : { } },
    { 'resource' : '/api/users/:id',      'method' : 'get',    'controller' : 'user',         'action' : 'get',              'args' : { } },
    { 'resource' : '/api/users/:id',      'method' : 'post',   'controller' : 'user',         'action' : 'update',           'args' : { } },
    { 'resource' : '/api/sessions/me',    'method' : 'get',    'controller' : 'session',      'action' : 'get',              'args' : { } },
    { 'resource' : '/api/projects',       'method' : 'get',    'controller' : 'project',      'action' : 'list',             'args' : { } },
    { 'resource' : '/api/projects',       'method' : 'post',   'controller' : 'project',      'action' : 'add',              'args' : { } },
    { 'resource' : '/api/projects/:id',   'method' : 'get',    'controller' : 'project',      'action' : 'get',              'args' : { } },
    { 'resource' : '/api/projects/:id',   'method' : 'post',   'controller' : 'project',      'action' : 'update',           'args' : { } },
    { 'resource' : '/api/projects/:id',   'method' : 'delete', 'controller' : 'project',      'action' : 'delete',           'args' : { } },
    { 'resource' : '/*',                  'method' : 'get',    'controller' : 'index',        'action' : 'default',          'args' : { } }
];
