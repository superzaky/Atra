module.exports =
[
	{ 'resource' : '/',           		'method' : 'get',  'controller' : 'index', 		'action' : 'default',     'args' : { } },
	{ 'resource' : '/~',          		'method' : 'get',  'controller' : 'index', 		'action' : 'info',        'args' : { } },
	{ 'resource' : '/login',      		'method' : 'post', 'controller' : 'auth',  		'action' : 'authorize',   'args' : { } },
	{ 'resource' : '/logout',     		'method' : 'get',  'controller' : 'auth',  		'action' : 'unauthorize', 'args' : { } },
	{ 'resource' : '/register',   		'method' : 'get',  'controller' : 'auth',  		'action' : 'register',    'args' : { } },
<<<<<<< HEAD
	{ 'resource' : '/projects', 		'method' : 'get',  'controller' : 'project',  	'action' : 'default',     'args' : { } },
=======
	{ 'resource' : '/projects', 	    'method' : 'get',  'controller' : 'project',  	'action' : 'default',     'args' : { } },
>>>>>>> 16eb3424b7d1eecb25ddde9a4f4b3ec0b21cdb1d
	{ 'resource' : '/admin/chat', 		'method' : 'get',  'controller' : 'chat',  		'action' : 'default',     'args' : { } },
	{ 'resource' : '/admin/game', 		'method' : 'get',  'controller' : 'game',  		'action' : 'default',     'args' : { } },
	{ 'resource' : '/api/users',  		'method' : 'get',  'controller' : 'user',  		'action' : 'list',        'args' : { } },
	{ 'resource' : '/api/users',  		'method' : 'post', 'controller' : 'user', 		'action' : 'add',         'args' : { } }
];
