var crypto = require('crypto');

function encryptString(string) {
    return crypto.createHash('sha256').update(string).digest('hex')
}

module.exports = {
    encryptString
}