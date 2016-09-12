const keystone = require('keystone'),
  Types = keystone.Field.Types;
const mongoosastic = require('mongoosastic');

const myStorage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    fs: {
      path: keystone.expandPath('./uploads'), // required; path where the files should be stored
      publicPath: '/public/uploads', // path where files will be served
    }
});

const Post = new keystone.List('Post', {
  autokey: { path: 'slug', from: 'title', unique: true },
  map: { name: 'title' },
  defaultSort: '-createdAt'
});

Post.add({
  title: { type: String, required: true },
  state: { type: Types.Select, options: 'draft, published, archived', default: 'draft' },
  author: { type: Types.Relationship, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  publishedAt: Date,
  image: { type: Types.File, storage: myStorage },
  content: {
    brief: { type: Types.Html, wysiwyg: true, height: 150 },
    extended: { type: Types.Html, wysiwyg: true, height: 400 }
  }
});

Post.defaultColumns = 'title, state|20%, author, publishedAt|15%'

Post.schema.plugin(mongoosastic);

Post.register();
