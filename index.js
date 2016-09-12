var keystone = require('keystone');
require('isomorphic-fetch');

keystone.init({
  'name': 'My Project',

  'favicon': 'public/favicon.ico',
  'less': 'public',
  'static': ['public'],

  'views': 'templates/views',
  'view engine': 'pug',

  'auto update': true,
  'mongo': 'mongodb://localhost/my-project',

  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': '(your secret here)',

  'wysiwyg images': true,
  'cloudinary config': {
    cloud_name: '<cloud_name>',
    api_key: '<api_key>',
    api_secret: '<api_secret>'
  },
  'wysiwyg additional plugins': 'table',
  'wysiwyg additional buttons': 'table',
  'wysiwyg additional options': {
    menubar : 'file edit format view insert tools table',
    relative_urls: false,
    visualblocks_default_state: true,
    external_plugins: {
      'tinyvision': '/assets/plugins/tinyvision/plugin.min.js'
    },
    tinyvision: {
      source: '/api/images'
      // Upload function is stripped from here so we'll customize tinyvision itself
    }
  }
});

keystone.import('models');
keystone.set('routes', require('./routes'));
keystone.start();
