// Initializes the `methods` service on path `/methods`
const createService = require('./methods.class.js');
const hooks = require('./methods.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');

  const options = {
    paginate,
  };

  // Initialize our service with any options it requires
  app.use('/methods', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('methods');

  service.hooks(hooks);
};
