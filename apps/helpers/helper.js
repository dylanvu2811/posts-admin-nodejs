const bcrypt = require("bcrypt");
const config = require("config");

const hash_password = (password) => {
    const saltRounds = config.get("salt");
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt);

    return hash; 
}

const compare_password = (password, hash) => {
    return bcrypt.compare(password, hash);
}
module.exports = {
    hash_password: hash_password,
    compare_password: compare_password
}