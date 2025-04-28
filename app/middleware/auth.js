
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const hsahePassword = (password) => {
    try {
        const salt = 10;
        const hashedPassword = bcrypt.hashSync(password, salt);
        return hashedPassword;

    } catch (err) {
        console.log(err);
    }
}

const comparePassword = (password, hashedPassword) => {

    return bcrypt.compare(password, hashedPassword);

}


module.exports = { hsahePassword, comparePassword }