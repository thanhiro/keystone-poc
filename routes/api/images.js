const keystone = require('keystone');

exports = module.exports = (req, res) => {
  const {cloud_name, api_key, api_secret} = keystone.get('cloudinary config');
  fetch(`https://${api_key}:${api_secret}@api.cloudinary.com/v1_1/${cloud_name}/resources/image`)
    .then(data => data.json())
    .then(data => data['resources'].map(({url, public_id}) =>
      ({imageUrl: url, name: public_id, value: url})))
    .then(data =>
      res.json(data));
};
