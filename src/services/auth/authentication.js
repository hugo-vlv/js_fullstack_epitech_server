const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const local = require('@feathersjs/authentication-local');
const validate = require('feathers-hooks-validate-joi');

const joiCreateRequest = require('../../schemas/requests/auth/create');
const joiOptions = { convert: true, abortEarly: false };

module.exports = function (app) {
  const config = app.get('authentication');

  // Configurer l'authentification avec le secret
  app.configure(authentication(config));
  app.configure(jwt());
  app.configure(local());

  // Le service `authentication' est utilisé pour créer un JWT.
  // Le hook avant `créer' enregistre les stratégies qui peuvent être utilisées
  // pour créer un nouveau JWT valide (par exemple local ou oauth2)
  app.service('authentication').hooks({
    before: {
      create: [
        validate.form(joiCreateRequest, joiOptions),
        authentication.hooks.authenticate(config.strategies)
      ],
      remove: [ /* Logout */
        authentication.hooks.authenticate('jwt')
      ]
    }
  });
};
