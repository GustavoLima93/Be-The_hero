const express = require('express');

const authMiddleware = require('./middlewares/auth');

const SessionController = require('./Controllers/SessionController');
const OngController = require('./Controllers/OngController');
const IncidentController = require('./Controllers/IncidentController');
const ProfileController = require('./Controllers/ProfileController');

const routes = express.Router();

routes.post('/sessions', SessionController.store);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.store);

routes.use(authMiddleware);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.store);
routes.delete('/incidents/:id', IncidentController.delete);
routes.get('/profile', ProfileController.index);

module.exports = routes;
