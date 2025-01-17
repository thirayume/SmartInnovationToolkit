const bcrypt = require('bcrypt');

async function generateHash() {
  const password = 'yv75cejFXf4aheE';
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  console.log('Hashed password:', hash);
}

generateHash();