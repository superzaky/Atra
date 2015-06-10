module.exports =
[
    { 'resource' : '/',                   'method' : 'get',    'controller' : 'index',        'action' : 'default',          'args' : { } },
    { 'resource' : '/~',                  'method' : 'get',    'controller' : 'index',        'action' : 'info',             'args' : { } },
    { 'resource' : '/login',              'method' : 'post',   'controller' : 'auth',         'action' : 'authorize',        'args' : { } },
    { 'resource' : '/logout',             'method' : 'get',    'controller' : 'auth',         'action' : 'unauthorize',      'args' : { } },
    { 'resource' : '/register',           'method' : 'get',    'controller' : 'auth',         'action' : 'register',         'args' : { } },
    { 'resource' : '/projects',           'method' : 'get',    'controller' : 'project',      'action' : 'view_projects',    'args' : { } },
    { 'resource' : '/projects/:id',       'method' : 'get',    'controller' : 'project',      'action' : 'view_project',     'args' : { } },
    { 'resource' : '/admin/chat',         'method' : 'get',    'controller' : 'chat',         'action' : 'default',          'args' : { } },
    { 'resource' : '/admin/game',         'method' : 'get',    'controller' : 'game',         'action' : 'default',          'args' : { } },
    { 'resource' : '/admin/settings',     'method' : 'get',    'controller' : 'user',         'action' : 'settings',         'args' : { } },
    { 'resource' : '/api/users',          'method' : 'get',    'controller' : 'user',         'action' : 'list',             'args' : { } },
    { 'resource' : '/api/users',          'method' : 'post',   'controller' : 'user',         'action' : 'add',              'args' : { } },
    { 'resource' : '/api/users/:id',      'method' : 'get',    'controller' : 'user',         'action' : 'get',              'args' : { } },
    { 'resource' : '/api/users/:id',      'method' : 'post',   'controller' : 'user',         'action' : 'update',           'args' : { } },
    { 'resource' : '/api/projects',       'method' : 'get',    'controller' : 'project',      'action' : 'list',             'args' : { } },
    { 'resource' : '/api/projects',       'method' : 'post',   'controller' : 'project',      'action' : 'add',              'args' : { } },
    { 'resource' : '/api/projects/:id',   'method' : 'get',    'controller' : 'project',      'action' : 'get',              'args' : { } },
    { 'resource' : '/api/projects/:id',   'method' : 'delete', 'controller' : 'project',      'action' : 'delete',           'args' : { } }
];     
     