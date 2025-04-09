const bcrypt = require('bcryptjs');
const saltRounds = 10;

async function encryptPassword(password) {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
}

async function verifyPassword(inputPassword, encryptedPassword) {
    return await bcrypt.compare(inputPassword, encryptedPassword);
}

module.exports = {
    encryptPassword,
    verifyPassword
}