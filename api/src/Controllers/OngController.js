const crypto = require('crypto');

const connection = require('../database/connection');
const auth_helper = require('../helpers/auth');

module.exports = {
  async index(req, res) {
    const ongs = await connection('ongs').select('*');

    return res.json(ongs);
  },

  async store(req, res) {
    const { name, email, password, whatsapp, city, uf } = req.body;

    const ongExists = await connection('ongs')
      .where('email', email)
      .select('*')
      .first();

    if (ongExists) {
      return res.status(401).json({ error: 'Email já cadastrado' });
    }

    const id = crypto.randomBytes(4).toString('HEX');
    const password_hash = await auth_helper.crypto(password);

    const ong = await connection('ongs').insert({
      id,
      name,
      email,
      password: password_hash,
      whatsapp,
      city,
      uf
    });

    return res.json({ id });
  }
};
