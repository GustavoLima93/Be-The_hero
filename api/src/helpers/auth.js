const bcrypt = require('bcryptjs');

module.exports = {
  async crypto(password) {
    return await bcrypt.hash(password, 8);
  },

  async compareAuth(password, passwordCompare) {
    return await bcrypt.compare(password, passwordCompare);
  }
};
