const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const auth_config = require('../config/auth');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Não foi localizado token' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const { id } = await promisify(jwt.verify)(token, auth_config.secret);
    req.ongId = id;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido, ou expirado' });
  }
};
