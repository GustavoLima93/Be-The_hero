const jwt = require('jsonwebtoken');

const connection = require('../database/connection');
const auth_helper = require('../helpers/auth');
const auth_config = require('../config/auth');

module.exports = {
  async store(req, res) {
    const { email, password } = req.body;

    const ong = await connection('ongs')
      .where('email', email)
      .select(['name', 'id', 'password'])
      .first();

    if (!ong) {
      return res.status(401).json({ erro: 'Email ou password inválido' });
    }

    if (!(await auth_helper.compareAuth(password, ong.password))) {
      return res.status(401).json({ erro: 'Email ou password inválido' });
    }

    return res.json({
      name: ong.name,
      id: ong.id,
      token: jwt.sign({ id: ong.id }, auth_config.secret, {
        expiresIn: auth_config.expire
      })
    });
  }
};
